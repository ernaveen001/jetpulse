from rest_framework import status, views, permissions, generics
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.db import transaction
from django.contrib.auth import authenticate
from apps.accounts.models import User, PatientProfile
from apps.accounts.serializers import UserSerializer, PatientProfileSerializer, RegisterSerializer, LoginSerializer, OTPRequestSerializer, OTPVerifySerializer

class RegisterView(views.APIView):
    permission_classes = [permissions.AllowAny]

    @transaction.atomic
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        email = data.get('email')
        phone = data.get('phone')

        if email and User.objects.filter(email=email).exists():
            return Response({"success": False, "error": {"code": "EMAIL_EXISTS", "message": "Email is already registered."}}, status=status.HTTP_400_BAD_REQUEST)

        if phone and User.objects.filter(phone=phone).exists():
            return Response({"success": False, "error": {"code": "PHONE_EXISTS", "message": "Phone number is already registered."}}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(
            email=email,
            phone=phone,
            password=data['password'],
            first_name=data['first_name'],
            last_name=data['last_name'],
            roles=[data['role']],
            is_active=True,
            is_verified=True
        )

        # Automatically create PatientProfile
        PatientProfile.objects.create(user=user)

        refresh = RefreshToken.for_user(user)

        return Response({
            "success": True,
            "message": "User registered successfully.",
            "data": {
                "user": UserSerializer(user).data,
                "access": str(refresh.access_token),
                "refresh": str(refresh)
            }
        }, status=status.HTTP_201_CREATED)

class LoginView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        login_input = serializer.validated_data['email_or_phone']
        password = serializer.validated_data['password']

        user = User.objects.filter(email=login_input).first() or User.objects.filter(phone=login_input).first()

        if not user or not user.check_password(password):
            return Response({
                "success": False,
                "error": {
                    "code": "INVALID_CREDENTIALS",
                    "message": "Invalid email/phone or password."
                }
            }, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)

        return Response({
            "success": True,
            "message": "Login successful.",
            "data": {
                "user": UserSerializer(user).data,
                "access": str(refresh.access_token),
                "refresh": str(refresh)
            }
        }, status=status.HTTP_200_OK)

class OTPRequestView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = OTPRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        phone = serializer.validated_data['phone']
        # Mock OTP dispatch architecture (e.g. Twilio / MSG91)
        return Response({
            "success": True,
            "message": f"OTP sent to {phone}. (Demo OTP: 123456)",
            "data": {"phone": phone}
        })

class OTPVerifyView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = OTPVerifySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        phone = serializer.validated_data['phone']
        otp = serializer.validated_data['otp']

        if otp != "123456":
            return Response({
                "success": False,
                "error": {"code": "INVALID_OTP", "message": "Invalid verification code."}
            }, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.filter(phone=phone).first()
        if not user:
            # Create user on first OTP login
            user = User.objects.create_user(
                phone=phone,
                first_name="User",
                last_name="Member",
                roles=['PATIENT'],
                is_verified=True
            )
            PatientProfile.objects.create(user=user)

        refresh = RefreshToken.for_user(user)
        return Response({
            "success": True,
            "message": "Phone verification successful.",
            "data": {
                "user": UserSerializer(user).data,
                "access": str(refresh.access_token),
                "refresh": str(refresh)
            }
        })

class UserProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

    def retrieve(self, request, *args, **kwargs):
        user = self.get_object()
        patient_profile = getattr(user, 'patient_profile', None)
        return Response({
            "success": True,
            "data": {
                "user": UserSerializer(user).data,
                "patient_profile": PatientProfileSerializer(patient_profile).data if patient_profile else None
            }
        })

class PatientProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PatientProfileSerializer

    def get_object(self):
        profile, _ = PatientProfile.objects.get_or_create(user=self.request.user)
        return profile

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({
            "success": True,
            "message": "Patient profile updated.",
            "data": serializer.data
        })
