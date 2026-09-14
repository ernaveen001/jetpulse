from django.db import models
from apps.core.models import BaseModel
from apps.accounts.models import User, PatientProfile

class Family(BaseModel):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owned_families')

    def __str__(self):
        return f"{self.name} (Owner: {self.owner.first_name})"

class FamilyMember(BaseModel):
    RELATIONSHIP_CHOICES = (
        ('mother', 'Mother'),
        ('father', 'Father'),
        ('son', 'Son'),
        ('daughter', 'Daughter'),
        ('spouse', 'Spouse'),
        ('grandparent', 'Grandparent'),
        ('guardian', 'Guardian'),
        ('child', 'Child'),
        ('sibling', 'Sibling'),
        ('other', 'Other'),
    )

    family = models.ForeignKey(Family, on_delete=models.CASCADE, related_name='members')
    patient_profile = models.ForeignKey(PatientProfile, on_delete=models.CASCADE, related_name='family_memberships')
    relationship = models.CharField(max_length=30, choices=RELATIONSHIP_CHOICES)
    is_primary_contact = models.BooleanField(default=False)
    
    # Granular permission scopes
    permissions = models.JSONField(
        default=list,
        help_text="Allowed scopes e.g. ['VIEW_PROFILE', 'VIEW_APPOINTMENTS', 'VIEW_DOCUMENTS', 'VIEW_HEALTH_JOURNEY', 'UPLOAD_DOCUMENTS', 'BOOK_COMPANION', 'RECEIVE_UPDATES']"
    )

    class Meta:
        unique_together = ('family', 'patient_profile')

    def __str__(self):
        return f"{self.patient_profile.user.first_name} in {self.family.name} as {self.relationship}"

class FamilyInvitation(BaseModel):
    STATUS_CHOICES = (
        ('PENDING', 'Pending'),
        ('ACCEPTED', 'Accepted'),
        ('DECLINED', 'Declined'),
        ('EXPIRED', 'Expired'),
    )

    family = models.ForeignKey(Family, on_delete=models.CASCADE, related_name='invitations')
    invited_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_family_invitations')
    email_or_phone = models.CharField(max_length=255)
    relationship = models.CharField(max_length=30, choices=FamilyMember.RELATIONSHIP_CHOICES)
    permissions = models.JSONField(default=list)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')

    def __str__(self):
        return f"Invitation to {self.email_or_phone} for {self.family.name}"

class AuditLog(BaseModel):
    actor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='audit_actions')
    action = models.CharField(max_length=100) # e.g. PERMISSION_CHANGE, DOCUMENT_ACCESS, REMOTE_BOOKING
    resource_type = models.CharField(max_length=100)
    resource_id = models.CharField(max_length=100)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    metadata = models.JSONField(default=dict)

    def __str__(self):
        return f"[{self.created_at}] {self.actor} -> {self.action} on {self.resource_type}:{self.resource_id}"
