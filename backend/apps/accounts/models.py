from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from apps.core.models import BaseModel

class UserManager(BaseUserManager):
    def create_user(self, email=None, phone=None, password=None, **extra_fields):
        if not email and not phone:
            raise ValueError("User must have an email or phone number.")
        if email:
            email = self.normalize_email(email)
        user = self.model(email=email, phone=phone, **extra_fields)
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_verified', True)
        return self.create_user(email=email, password=password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin, BaseModel):
    """
    Custom JetPulse User Model supporting phone-first or email authentication.
    Uses UUID4 public IDs.
    """
    GENDER_CHOICES = (
        ('MALE', 'Male'),
        ('FEMALE', 'Female'),
        ('OTHER', 'Other'),
        ('PREFER_NOT_TO_SAY', 'Prefer Not to Say'),
    )

    ROLE_CHOICES = (
        ('PATIENT', 'Patient'),
        ('FAMILY_MEMBER', 'Family Member'),
        ('GUARDIAN', 'Guardian'),
        ('COMPANION', 'Companion'),
        ('PROVIDER', 'Healthcare Provider'),
        ('PROVIDER_ADMIN', 'Provider Admin'),
        ('PLATFORM_ADMIN', 'Platform Admin'),
        ('SUPPORT_AGENT', 'Support Agent'),
    )

    phone = models.CharField(max_length=20, unique=True, null=True, blank=True, db_index=True)
    email = models.EmailField(max_length=255, unique=True, null=True, blank=True, db_index=True)
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=20, choices=GENDER_CHOICES, default='PREFER_NOT_TO_SAY')
    profile_photo = models.CharField(max_length=500, blank=True, null=True)
    
    roles = models.JSONField(default=list, help_style="List of user roles e.g. ['PATIENT', 'FAMILY_MEMBER']")

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.phone or self.email})"

class PatientProfile(BaseModel):
    """
    Patient Profile separated from User Account.
    A single User can be connected to their own Patient Profile or manage external family members.
    """
    BLOOD_GROUP_CHOICES = (
        ('A+', 'A Positive'), ('A-', 'A Negative'),
        ('B+', 'B Positive'), ('B-', 'B Negative'),
        ('O+', 'O Positive'), ('O-', 'O Negative'),
        ('AB+', 'AB Positive'), ('AB-', 'AB Negative'),
        ('UNKNOWN', 'Unknown'),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='patient_profile')
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=20, choices=User.GENDER_CHOICES, default='PREFER_NOT_TO_SAY')
    blood_group = models.CharField(max_length=10, choices=BLOOD_GROUP_CHOICES, default='UNKNOWN')
    preferred_language = models.CharField(max_length=50, default='English')
    emergency_contact = models.CharField(max_length=100, blank=True)
    address = models.TextField(blank=True)
    city = models.CharField(max_length=100, db_index=True, blank=True)
    state = models.CharField(max_length=100, blank=True)
    pincode = models.CharField(max_length=20, blank=True)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)

    def __str__(self):
        return f"Patient: {self.user.first_name} {self.user.last_name} ({self.city})"
