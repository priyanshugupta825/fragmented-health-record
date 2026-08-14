from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from datetime import date, datetime


class MedicineExtracted(BaseModel):
    name: str = Field(..., description="Generic name or active salt of the medicine")
    brand_name: Optional[str] = Field(None, description="Commercial brand name if written, e.g., Telma 40, Augmentin 625")
    dosage: str = Field(..., description="Dosage amount e.g. 40mg, 500mg, 5ml")
    form: str = Field("tablet", description="Dosage form: tablet, capsule, syrup, injection, drops, inhaler, ointment")
    frequency: str = Field(..., description="Frequency or Indian prescription shorthand: 1-0-1, OD (once daily), BD (twice daily), TDS, QID, SOS (as needed)")
    timing: Optional[str] = Field(None, description="Meal timing: After food, Before food, Bedtime, With meals")
    duration: Optional[str] = Field(None, description="Prescribed duration e.g. 5 days, 1 month, Chronic / Long-term")
    purpose: Optional[str] = Field(None, description="Clinical reason or target symptom for this medicine")
    instructions: Optional[str] = Field(None, description="Special dietary or usage instructions")


class LabResultExtracted(BaseModel):
    test_name: str = Field(..., description="Standard name of the diagnostic test e.g. HbA1c, Serum Creatinine, Fasting Blood Sugar")
    category: str = Field("General", description="Category: Complete Blood Count, Lipid Profile, Renal Function, Liver Function, Thyroid Panel, Diabetes")
    value: str = Field(..., description="Extracted numerical or qualitative test result value")
    unit: Optional[str] = Field(None, description="Unit of measurement e.g. mg/dL, %, g/dL, U/L")
    reference_range: Optional[str] = Field(None, description="Normal biological reference interval e.g. 70-100, < 5.7")
    flag: str = Field("normal", description="Clinical flag: normal, high, low, critical, abnormal")
    test_date: Optional[str] = Field(None, description="Date the test was performed (YYYY-MM-DD)")
    lab_name: Optional[str] = Field(None, description="Diagnostic lab or diagnostic center name")


class ClinicalEncounterExtracted(BaseModel):
    record_type: str = Field("prescription", description="Document type: prescription, lab_report, consultation, discharge_summary, invoice, vaccine_certificate")
    record_date: Optional[str] = Field(None, description="Date of prescription or consultation in YYYY-MM-DD format")
    doctor_name: Optional[str] = Field(None, description="Name of consulting physician with Dr. prefix")
    doctor_specialty: Optional[str] = Field(None, description="Specialty e.g. General Medicine, Cardiology, Pediatrics")
    facility_name: Optional[str] = Field(None, description="Hospital, clinic, or diagnostic center name")
    chief_complaints: List[str] = Field(default_factory=list, description="Patient reported symptoms and primary complaints")
    diagnoses: List[str] = Field(default_factory=list, description="Provisional or confirmed medical diagnoses written by doctor")
    clinical_notes: Optional[str] = Field(None, description="Doctor observations, clinical advice, or follow-up recommendations")
    recommended_follow_up: Optional[str] = Field(None, description="Suggested next visit date or follow-up window")
    confidence_score: float = Field(1.0, ge=0.0, le=1.0, description="Confidence score of AI extraction")
    summary: Optional[str] = Field(None, description="2-3 sentence layman-friendly overview of the document")


class DocumentExtractionResult(BaseModel):
    encounter: ClinicalEncounterExtracted
    medicines: List[MedicineExtracted] = Field(default_factory=list)
    lab_results: List[LabResultExtracted] = Field(default_factory=list)
    vital_signs: Dict[str, Any] = Field(default_factory=dict, description="Extracted vitals e.g. BP, Pulse, SpO2, Temperature, Weight")
    raw_ai_disclaimer: str = Field(
        "AI extraction is assistive. Verify extracted values with original prescription before taking medication.",
        description="Mandatory medical safety disclaimer"
    )
