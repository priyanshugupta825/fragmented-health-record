from datetime import datetime
from sqlalchemy import Column, String, DateTime, Text, Boolean, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.core.database import Base


class ConsentShare(Base):
    __tablename__ = "consent_shares"

    id = Column(String(36), primary_key=True, index=True)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)

    recipient_name = Column(String(255), nullable=False)  # Dr. Rajesh Kumar or Hospital Name
    recipient_identifier = Column(String(255), nullable=True)  # Doctor Email, Phone, or Registration number
    access_code = Column(String(64), unique=True, index=True, nullable=False)  # Secure unguessable token or passcode
    
    # Permissions scope: ["all", "timeline", "medicines", "lab_reports", "discharge_summaries"]
    permissions = Column(JSON, default=lambda: ["timeline", "medicines", "lab_reports"], nullable=False)
    
    purpose = Column(String(255), default="Clinical Consultation", nullable=False)
    expires_at = Column(DateTime, nullable=False, index=True)  # Time-limited link/access expiration
    is_active = Column(Boolean, default=True, nullable=False)
    revoked_at = Column(DateTime, nullable=True)
    
    pre_consult_summary = Column(Text, nullable=True)  # AI generated 60-sec brief for the doctor
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Relationships
    user = relationship("User", back_populates="consent_shares")
    access_logs = relationship("AccessLog", back_populates="consent_share", cascade="all, delete-orphan")


class AccessLog(Base):
    __tablename__ = "access_logs"

    id = Column(String(36), primary_key=True, index=True)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    consent_share_id = Column(String(36), ForeignKey("consent_shares.id", ondelete="SET NULL"), nullable=True, index=True)

    accessor_name = Column(String(255), nullable=False)  # Doctor name, Emergency Responder, or "Public QR"
    access_type = Column(String(50), nullable=False)  # doctor_portal, emergency_qr, user_export, api
    ip_address = Column(String(50), nullable=True)
    user_agent = Column(Text, nullable=True)
    accessed_sections = Column(JSON, default=list, nullable=False)  # ["emergency_card", "active_meds"]
    
    accessed_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Relationships
    user = relationship("User", back_populates="access_logs")
    consent_share = relationship("ConsentShare", back_populates="access_logs")
