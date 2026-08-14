# 🚀 Production Deployment Guide
**Fragmented Health Record** — Team: Creative Tinkers

This guide provides step-by-step instructions to deploy the application onto **Supabase**, **Render**, and **Vercel**.

---

## 1. Supabase Setup (Database, Auth, Storage)

1. Go to [Supabase](https://supabase.com) and create a new project.
2. In the **SQL Editor**, open [`supabase_schema.sql`](file:///c:/Users/bhola/Downloads/GDTA/supabase_schema.sql), paste its content, and click **Run**.
3. In **Storage**, verify that the `medical-records` bucket exists and is set to **Public**.
4. In **Project Settings** → **Database**, copy your **Connection string (URI)** (starts with `postgresql://postgres:...`).
5. In **Project Settings** → **API**, copy:
   - **Project URL** (`SUPABASE_URL`)
   - **Anon Key** (`SUPABASE_KEY`)
   - **JWT Secret** (`SUPABASE_JWT_SECRET` under API settings)

---

## 2. Render Deployment (Backend FastAPI)

### Option A: Using Render Blueprint (1-Click)
1. Push this project to GitHub.
2. Go to [Render Dashboard](https://dashboard.render.com/) → **Blueprints** → **New Blueprint Instance**.
3. Select your repository (it will automatically detect [`render.yaml`](file:///c:/Users/bhola/Downloads/GDTA/render.yaml)).
4. Fill in the environment variables:
   - `DATABASE_URL`: Your Supabase connection string
   - `SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_KEY`: Your Supabase Anon or Service Key
   - `SUPABASE_JWT_SECRET`: Your Supabase JWT secret
   - `GEMINI_API_KEY`: Your Google Gemini API Key
   - `CORS_ORIGINS`: `["*"]` (or your Vercel URL)
5. Click **Apply**. Your backend will deploy and give you a live URL (e.g. `https://fragmented-health-backend.onrender.com`).

### Option B: Manual Web Service
- **Root Directory**: `backend`
- **Environment**: `Python 3`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

---

## 3. Vercel Deployment (Frontend React + Vite)

1. Go to [Vercel](https://vercel.com) → **Add New Project**.
2. Import your GitHub repository.
3. In the project setup:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. In **Environment Variables**, add:
   - `VITE_API_URL`: `https://your-render-backend-url.onrender.com/api`
   - `VITE_SUPABASE_URL`: `https://your-project.supabase.co`
   - `VITE_SUPABASE_ANON_KEY`: `your-supabase-anon-key`
5. Click **Deploy**. Vercel will build the frontend using [`vercel.json`](file:///c:/Users/bhola/Downloads/GDTA/frontend/vercel.json) with client-side SPA routing support.

---

## 4. Git Commands to Push to GitHub

```bash
git init
git add .
git commit -m "feat: complete Fragmented Health Record platform with Mint & Sage theme"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/fragmented-health-record.git
git push -u origin main
```

---

## ✅ Deployment Checklist

- [ ] Supabase SQL schema executed ([`supabase_schema.sql`](file:///c:/Users/bhola/Downloads/GDTA/supabase_schema.sql))
- [ ] Supabase storage bucket `medical-records` created
- [ ] Backend deployed on Render with `DATABASE_URL` & `GEMINI_API_KEY`
- [ ] Frontend deployed on Vercel with `VITE_API_URL` pointing to Render
- [ ] Tested `/api/health` on live Render URL
- [ ] Tested public first-responder view `/emergency-view/:token`
- [ ] Tested public doctor view `/doctor-view/:token`
