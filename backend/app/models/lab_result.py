from datetime import datetime
from sqlalchemy import Column, String, DateTime, Date, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.core.database import Base


class LabResult(Base):
    __tablename__ = "lab_results"

    id = Column(String(36), primary_key=True, index=True)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    document_id = Column(String(36), ForeignKey("documents.id", ondelete="SET NULL"), nullable=True, index=True)

    test_name = Column(String(255), nullable=False, index=True)  # e.g., "HbA1c", "Total Cholesterol", "Serum Creatinine"
    category = Column(String(100), default="General", nullable=False)  # Lipid Profile, Complete Blood Count, Renal Panel, Thyroid
    value = Column(String(100), nullable=False)  # "6.8", "14.2", "Positive"
    unit = Column(String(50), nullable=True)  # "%", "mg/dL", "g/dL"
    reference_range = Column(String(100), nullable=True)  # "< 5.7", "13.0 - 17.0"
    
    flag = Column(String(30), default="normal", nullable=False)  # normal, high, low, critical, abnormal
    test_date = Column(Date, nullable=True, index=True)
    lab_name = Column(String(255), nullable=True)  # e.g., "Dr Lal PathLabs"
    clinical_interpretation = Column(Text, nullable=True)  # Assistive note for review

    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Relationships
    user = relationship("User", back_populates="lab_results")
    document = relationship("Document", back_populates="lab_results")
