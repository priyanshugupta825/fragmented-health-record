import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  UploadCloud,
  Activity,
  Pill,
  ShieldAlert,
  UserCheck,
  FileText,
  Clock,
  Sparkles,
  ChevronRight,
  AlertCircle,
  Plus,
} from 'lucide-react';

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const displayName = user?.user_metadata?.full_name || 'Patient';
  const abhaId = user?.user_metadata?.abha_id || '91-4521-8890-4123';

  return (
    <div className="space-y-6">
      {/* Header Banner - Mint & Sage Theme */}
      <div className="bg-gradient-to-r from-brand-700 via-brand-600 to-brand-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-brand-900/10 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-brand-500/30">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-xs mb-3 border border-white/20">
            <Sparkles className="w-3.5 h-3.5" /> ABDM Connected Profile
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Namaste, {displayName}
          </h1>
          <p className="text-brand-100 text-sm mt-1.5 max-w-xl leading-relaxed">
            Your unified health records are consolidated across hospitals, clinics, and labs with Gemini AI document intelligence.
          </p>
          <div className="mt-4 flex items-center gap-3 text-xs text-brand-100 font-mono bg-black/20 px-3 py-1.5 rounded-xl w-fit border border-white/10">
            <span>ABHA:</span>
            <span className="font-bold text-white tracking-wider">{abhaId}</span>
          </div>
        </div>

        {/* Quick Actions in banner */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate('/upload')}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-brand-800 font-bold text-sm hover:bg-brand-50 transition shadow-sm"
          >
            <UploadCloud className="w-4 h-4 text-brand-600" />
            <span>Upload Document</span>
          </button>
          <button
            onClick={() => navigate('/emergency')}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emergency-600 text-white font-bold text-sm hover:bg-emergency-700 transition shadow-sm"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Emergency QR</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-brand-100 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Vault Files</span>
            <div className="p-2 rounded-xl bg-brand-100 text-brand-700">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">12</p>
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <span className="text-brand-700 font-bold">100%</span> AI Extracted
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-brand-100 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Meds</span>
            <div className="p-2 rounded-xl bg-brand-100 text-brand-700">
              <Pill className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">3</p>
          <p className="text-xs text-slate-500 mt-1">Dosage on track today</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-brand-100 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Encounters</span>
            <div className="p-2 rounded-xl bg-sand-100 text-sand-700">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">8</p>
          <p className="text-xs text-slate-500 mt-1">Across 3 hospital networks</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-brand-100 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Doctor Shares</span>
            <div className="p-2 rounded-xl bg-brand-200/80 text-brand-800">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">1 Active</p>
          <p className="text-xs text-brand-700 font-medium mt-1">Expires in 18 hrs</p>
        </div>
      </div>

      {/* Main Grid: Recent Timeline & Active Medications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Health Journey (2 Columns on large screens) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-brand-100 p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-brand-950">Recent Health Journey</h2>
              <p className="text-xs text-slate-500">Auto-extracted from your prescriptions & lab reports</p>
            </div>
            <button
              onClick={() => navigate('/timeline')}
              className="text-xs font-bold text-brand-700 hover:text-brand-800 flex items-center gap-1 bg-brand-50 px-2.5 py-1 rounded-lg border border-brand-100"
            >
              Full Timeline <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-brand-50/60 border border-brand-200/60 hover:border-brand-300 transition">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white border border-brand-200 text-brand-700 font-bold text-xs mt-0.5 shadow-2xs">
                    12 Aug
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Cardiology Consultation & Lipid Panel</h3>
                    <p className="text-xs text-slate-600">Dr. A. Sharma • Max Super Speciality Hospital</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[11px] px-2.5 py-0.5 rounded-lg bg-brand-100 text-brand-800 font-semibold border border-brand-200/80">
                        Prescription Updated
                      </span>
                      <span className="text-[11px] px-2.5 py-0.5 rounded-lg bg-sand-200/80 text-sand-800 font-semibold border border-sand-300">
                        LDL: 142 mg/dL (Elevated)
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/timeline')}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-brand-50/60 border border-brand-200/60 hover:border-brand-300 transition">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white border border-brand-200 text-brand-700 font-bold text-xs mt-0.5 shadow-2xs">
                    28 Jul
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Routine Health Checkup & HbA1c</h3>
                    <p className="text-xs text-slate-600">Dr Lal PathLabs • Diagnostic Report</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[11px] px-2.5 py-0.5 rounded-lg bg-brand-100 text-brand-800 font-semibold border border-brand-200/80">
                        HbA1c: 5.9% (Pre-diabetic flag)
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/timeline')}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Active Medications Quick Manager */}
        <div className="bg-white rounded-3xl border border-brand-100 p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-bold text-brand-950">Active Medicines</h2>
                <p className="text-xs text-slate-500">Current active prescriptions</p>
              </div>
              <button
                onClick={() => navigate('/medicines')}
                className="p-1.5 rounded-xl bg-brand-100 text-brand-700 hover:bg-brand-200 transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-brand-50/70 border border-brand-200/60 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Telmisartan 40mg</h4>
                  <p className="text-xs text-slate-500">1 tablet • Morning after breakfast</p>
                </div>
                <span className="text-[11px] font-bold text-brand-800 bg-brand-100 px-2.5 py-1 rounded-xl border border-brand-200">
                  Taken 8:30 AM
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-brand-50/70 border border-brand-200/60 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Atorvastatin 10mg</h4>
                  <p className="text-xs text-slate-500">1 tablet • Night before sleep</p>
                </div>
                <span className="text-[11px] font-semibold text-slate-600 bg-slate-200/70 px-2.5 py-1 rounded-xl">
                  Due 9:30 PM
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-brand-50/70 border border-brand-200/60 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Vitamin D3 60k</h4>
                  <p className="text-xs text-slate-500">1 cap • Weekly Sunday</p>
                </div>
                <span className="text-[11px] font-semibold text-slate-600 bg-slate-200/70 px-2.5 py-1 rounded-xl">
                  Next Sun
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/medicines')}
            className="w-full mt-5 py-2.5 px-3 rounded-xl border border-brand-200 text-xs font-bold text-brand-800 bg-brand-50 hover:bg-brand-100 transition text-center"
          >
            Manage All Dosages & History
          </button>
        </div>
      </div>
    </div>
  );
};
