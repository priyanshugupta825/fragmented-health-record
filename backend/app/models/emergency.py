from datetime import datetime
from sqlalchemy import Column, String, DateTime, Text, Boolean, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.core.database import Base


class EmergencyInfo(Base):
    __tablename__ = "emergency_info"

    id = Column(String(36), primary_key=True, index=True)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False, index=True)
    
    blood_group = Column(String(10), nullable=True)  # A+, A-, B+, B-, AB+, AB-, O+, O-
    allergies = Column(JSON, default=list, nullable=False)  # List of strings e.g. ["Penicillin", "Peanuts"]
    chronic_conditions = Column(JSON, default=list, nullable=False)  # List of strings e.g. ["Type 2 Diabetes", "Asthma"]
    emergency_contacts = Column(JSON, default=list, nullable=False)  # List of dicts: [{"name": "...", "relation": "...", "phone": "..."}]
    
    organ_donor = Column(Boolean, default=False, nullable=False)
    critical_notes = Column(Text, nullable=True)  # e.g., "Pacemaker implanted 2023, Bleeding disorder"
    
    is_publicly_visible_via_qr = Column(Boolean, default=True, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    # Relationships
    user = relationship("User", back_populates="emergency_info")
