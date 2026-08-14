from typing import Optional, List, Dict, Any
from datetime import datetime, date
from pydantic import BaseModel, EmailStr


class EmergencyContactSchema(BaseModel):
    name: str
    relation: str
    phone: str


class EmergencyInfoBase(BaseModel):
    blood_group: Optional[str] = None
    allergies: List[str] = []
    chronic_conditions: List[str] = []
    emergency_contacts: List[EmergencyContactSchema] = []
    organ_donor: bool = False
    critical_notes: Optional[str] = None
    is_publicly_visible_via_qr: bool = True


class EmergencyInfoResponse(EmergencyInfoBase):
    id: str
    user_id: str
    updated_at: datetime

    class Config:
        from_attributes = True


class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    abha_id: Optional[str] = None
    abha_address: Optional[str] = None
    phone_number: Optional[str] = None
    date_of_birth: Optional[date] = None
    gender: Optional[str] = None
    address: Optional[str] = None


class UserCreate(UserBase):
    id: str  # Matches Supabase Auth user UUID


class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    abha_id: Optional[str] = None
    abha_address: Optional[str] = None
    phone_number: Optional[str] = None
    date_of_birth: Optional[date] = None
    gender: Optional[str] = None
    address: Optional[str] = None


class UserResponse(UserBase):
    id: str
    created_at: datetime
    updated_at: datetime
    emergency_info: Optional[EmergencyInfoResponse] = None

    class Config:
        from_attributes = True
