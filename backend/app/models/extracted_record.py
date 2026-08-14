from datetime import datetime
from sqlalchemy import Column, String, DateTime, Date, Text, Float, Boolean, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.core.database import Base


class ExtractedRecord(Base):
    __tablename__ = "extracted_records"

    id = Column(String(36), primary_key=True, index=True)
    document_id = Column(String(36), ForeignKey("documents.id", ondelete="CASCADE"), nullable=False, index=True)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)

    record_type = Column(String(50), nullable=False)  # consultation, diagnosis, lab_test, prescription, hospital_admission
    record_date = Column(Date, nullable=True)
    
    doctor_name = Column(String(255), nullable=True)
    doctor_specialty = Column(String(150), nullable=True)
    facility_name = Column(String(255), nullable=True)  # Hospital / Clinic / Lab name
    
    chief_complaints = Column(JSON, default=list, nullable=False)  # ["chest pain", "fever"]
    diagnoses = Column(JSON, default=list, nullable=False)  # ["Hypertension stage 1", "URTI"]
    clinical_notes = Column(Text, nullable=True)
    recommended_follow_up = Column(String(255), nullable=True)
    
    confidence_score = Column(Float, default=1.0, nullable=False)
    ai_raw_json = Column(JSON, default=dict, nullable=False)
    
    verified_by_user = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    # Relationships
    document = relationship("Document", back_populates="extracted_records")
    user = relationship("User", back_populates="extracted_records")
