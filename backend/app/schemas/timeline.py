from typing import List, Optional, Any
from datetime import date, datetime
from pydantic import BaseModel, Field


class TimelineMedicineItem(BaseModel):
    id: Optional[str] = None
    name: str
    brand_name: Optional[str] = None
    dosage: str
    form: Optional[str] = "tablet"
    frequency: str
    timing: Optional[str] = None
    purpose: Optional[str] = None
    instructions: Optional[str] = None

    class Config:
        from_attributes = True


class TimelineLabItem(BaseModel):
    id: Optional[str] = None
    test_name: str
    category: Optional[str] = "General"
    value: str
    unit: Optional[str] = None
    reference_range: Optional[str] = None
    flag: str = "normal"
    test_date: Optional[date] = None
    lab_name: Optional[str] = None

    class Config:
        from_attributes = True


class TimelineDocumentMeta(BaseModel):
    id: str
    file_name: str
    file_url: str
    mime_type: Optional[str] = None
    uploaded_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class TimelineItemResponse(BaseModel):
    id: str
    document_id: Optional[str] = None
    record_type: str
    record_date: Optional[date] = None
    doctor_name: Optional[str] = None
    doctor_specialty: Optional[str] = None
    facility_name: Optional[str] = None
    chief_complaints: List[str] = Field(default_factory=list)
    diagnoses: List[str] = Field(default_factory=list)
    clinical_notes: Optional[str] = None
    recommended_follow_up: Optional[str] = None
    confidence_score: float = 1.0
    verified_by_user: bool = False
    created_at: datetime
    document: Optional[TimelineDocumentMeta] = None
    medicines: List[TimelineMedicineItem] = Field(default_factory=list)
    lab_results: List[TimelineLabItem] = Field(default_factory=list)

    class Config:
        from_attributes = True


class TimelineResponse(BaseModel):
    success: bool = True
    total_records: int
    records: List[TimelineItemResponse]
