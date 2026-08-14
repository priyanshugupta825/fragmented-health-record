from datetime import datetime
from sqlalchemy import Column, String, DateTime, Date, Text
from sqlalchemy.orm import relationship
from app.core.database import Base


class User(Base):
    __tablename__ = "users"

    # Matches Supabase auth.users ID (UUID as string)
    id = Column(String(36), primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    full_name = Column(String(255), nullable=True)
    abha_id = Column(String(50), unique=True, index=True, nullable=True)  # e.g., 14-digit ABHA ID (12-3456-7890-1234)
    abha_address = Column(String(100), unique=True, index=True, nullable=True)  # e.g., name@abdm
    phone_number = Column(String(20), nullable=True)
    date_of_birth = Column(Date, nullable=True)
    gender = Column(String(20), nullable=True)  # Male, Female, Other
    address = Column(Text, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    # Relationships
    emergency_info = relationship("EmergencyInfo", back_populates="user", uselist=False, cascade="all, delete-orphan")
    documents = relationship("Document", back_populates="user", cascade="all, delete-orphan")
    extracted_records = relationship("ExtractedRecord", back_populates="user", cascade="all, delete-orphan")
    medicines = relationship("Medicine", back_populates="user", cascade="all, delete-orphan")
    medicine_logs = relationship("MedicineLog", back_populates="user", cascade="all, delete-orphan")
    lab_results = relationship("LabResult", back_populates="user", cascade="all, delete-orphan")
    consent_shares = relationship("ConsentShare", back_populates="user", cascade="all, delete-orphan")
    access_logs = relationship("AccessLog", back_populates="user", cascade="all, delete-orphan")
    emergency_qr_tokens = relationship("EmergencyQRToken", back_populates="user", cascade="all, delete-orphan")
