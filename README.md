# Fragmented Health Record (Creative Tinkers)

AI-Powered Personal Health Record Platform integrated with India's ABDM / ABHA Ecosystem.

## Project Structure

```
├── backend/
│   ├── alembic/                # Database migrations
│   │   ├── versions/
│   │   └── env.py
│   ├── app/
│   │   ├── core/
│   │   │   ├── config.py       # Pydantic settings & env config
│   │   │   ├── database.py     # SQLAlchemy engine & sessionmaker
│   │   │   └── security.py     # Supabase Auth JWT token verification
│   │   ├── models/             # SQLAlchemy ORM models
│   │   │   ├── user.py         # User (ABHA ID, profile)
│   │   │   ├── emergency.py    # EmergencyInfo (blood group, allergies)
│   │   │   ├── document.py     # Document (Health Vault)
│   │   │   ├── extracted_record.py # AI Extracted Clinical Records
│   │   │   ├── medicine.py     # Medicine & MedicineLog
│   │   │   ├── lab_result.py   # LabResult (tests, flags, ranges)
│   │   │   ├── consent.py      # ConsentShare & AccessLog
│   │   │   └── emergency_qr.py # EmergencyQRToken
│   │   ├── routers/
│   │   │   └── health.py       # /health endpoint
│   │   ├── schemas/            # Pydantic request/response schemas
│   │   ├── services/           # AI extraction & external services
│   │   └── main.py             # FastAPI entry point & CORS
│   ├── alembic.ini             # Alembic migration configuration
│   ├── requirements.txt        # Python dependencies
│   └── .env.example            # Backend environment variables
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── client.js       # Axios client with Supabase JWT interceptor
    │   ├── components/
    │   │   ├── auth/
    │   │   │   └── ProtectedRoute.jsx
    │   │   └── layout/
    │   │       ├── Layout.jsx  # Main layout wrapper
    │   │       ├── Navbar.jsx  # Header & Emergency trigger
    │   │       └── Sidebar.jsx # Navigation with ABHA ID status
    │   ├── context/
    │   │   └── AuthContext.jsx # Supabase Auth context + Demo fallback
    │   ├── lib/
    │   │   └── supabase.js     # Supabase JS client
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Signup.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Upload.jsx      # Health Vault & AI Doc Intelligence
    │   │   ├── Timeline.jsx    # Health Timeline
    │   │   ├── MedicineManager.jsx # Dosage schedules & adherence
    │   │   ├── EmergencyCard.jsx   # Emergency QR Mode
    │   │   └── DoctorPortal.jsx    # Doctor Dashboard & Consent sharing
    │   ├── App.jsx             # React router
    │   ├── main.jsx            # React root
    │   └── index.css           # Tailwind design system
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    ├── vite.config.js
    └── .env.example
```

## Quick Start

### 1. Backend (FastAPI)
```bash
cd backend
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Linux/Mac:
# source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env

# Run FastAPI dev server
uvicorn app.main:app --reload --port 8000
```
- API Docs: `http://localhost:8000/docs`
- Health Check: `http://localhost:8000/api/health`

### 2. Frontend (React + Vite)
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
- Web Application: `http://localhost:5173`
