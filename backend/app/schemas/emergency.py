from typing import List, Optional, Dict, Any
from datetime import datetime
from pydantic import BaseModel, Field


class EmergencyContactItem(BaseModel):
    name: str
    relation: str
    phone: str


class EmergencyActiveMedicine(BaseModel):
    name: str
    dosage: str
    frequency: Optional[str] = None


class EmergencyProfileUpdate(BaseModel):
    blood_group: Optional[str] = None
    allergies: List[str] = []
    chronic_conditions: List[str] = []
    emergency_contacts: List[EmergencyContactItem] = []
    organ_donor: bool = False
    critical_notes: Optional[str] = None
    is_publicly_visible_via_qr: bool = True


class EmergencyTokenGenerateResponse(BaseModel):
    success: bool = True
    token: str
    expires_at: datetime
    public_url: str
    message: str


class PublicEmergencyCardResponse(BaseModel):
    """
    Publicly returned emergency medical response.
    STRICT PRIVACY GUARD: Excludes full history, clinical consultation notes, or doctor IDs.
    """
    success: bool = True
    patient_name: str
    abha_id: Optional[str] = None
    blood_group: Optional[str] = None
    allergies: List[str] = Field(default_factory=list)
    chronic_conditions: List[str] = Field(default_factory=list)
    active_medicines: List[EmergencyActiveMedicine] = Field(default_factory=list)
    emergency_contacts: List[EmergencyContactItem] = Field(default_factory=list)
    organ_donor: bool = False
    critical_notes: Optional[str] = None
    expires_at: datetime
    token_valid: bool = True
    disclaimer: str = "First-responder emergency information provided via patient's ABDM Emergency QR Protocol."
