import React, { useState } from 'react';
import {
  Pill,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Plus,
  Calendar,
  Sparkles,
} from 'lucide-react';

const mockMeds = [
  {
    id: '1',
    name: 'Telmisartan',
    brand: 'Telma 40',
    dosage: '40 mg',
    frequency: 'Once Daily (1-0-0)',
    timing: 'Morning after breakfast',
    purpose: 'Hypertension Management',
    status: 'taken',
    lastTaken: 'Today, 8:30 AM',
    nextDue: 'Tomorrow, 8:00 AM',
  },
  {
    id: '2',
    name: 'Atorvastatin',
    brand: 'Lipitor 10',
    dosage: '10 mg',
    frequency: 'Once Daily (0-0-1)',
    timing: 'Night before bed',
    purpose: 'Cholesterol Regulation',
    status: 'pending',
    nextDue: 'Today, 9:30 PM',
  },
  {
    id: '3',
    name: 'Cholecalciferol',
    brand: 'Calcirol 60K',
    dosage: '60,000 IU',
    frequency: 'Once Weekly',
    timing: 'Sunday with milk',
    purpose: 'Vitamin D Deficiency',
    status: 'scheduled',
    nextDue: 'Sunday, 10:00 AM',
  },
];

export const MedicineManager = () => {
  const [medicines, setMedicines] = useState(mockMeds);

  const toggleStatus = (id) => {
    setMedicines((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              status: m.status === 'taken' ? 'pending' : 'taken',
              lastTaken: m.status === 'taken' ? null : 'Just now',
            }
          : m
      )
    );
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 text-brand-800 text-xs font-semibold mb-2 border border-brand-200/80">
            <Pill className="w-3.5 h-3.5 text-brand-600" /> Active Prescriptions & Adherence
          </div>
          <h1 className="text-2xl font-bold text-brand-950">Medicine Manager</h1>
          <p className="text-sm text-slate-500 mt-1">
            Track active prescriptions, dosage timings, and daily adherence records
          </p>
        </div>

        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-2xs transition">
          <Plus className="w-4 h-4" />
          <span>Add Prescription</span>
        </button>
      </div>

      {/* Adherence Summary Bar */}
      <div className="bg-white rounded-3xl border border-brand-100 p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="w-14 h-14 rounded-2xl bg-brand-100 text-brand-800 flex items-center justify-center font-extrabold text-xl border border-brand-200">
            85%
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">30-Day Medication Adherence</h3>
            <p className="text-xs text-slate-500">26 of 30 days completed without missed doses</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-brand-800 bg-brand-50 px-3.5 py-2 rounded-xl border border-brand-200">
          <Sparkles className="w-4 h-4 text-brand-600" />
          <span>Synced with Gemini prescription extracts</span>
        </div>
      </div>

      {/* Active Medicine Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {medicines.map((med) => (
          <div
            key={med.id}
            className="bg-white rounded-3xl border border-brand-100 p-5 shadow-2xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{med.name}</h3>
                  <p className="text-xs text-brand-700 font-semibold">{med.brand} • {med.dosage}</p>
                </div>
                <span
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${
                    med.status === 'taken'
                      ? 'bg-brand-100 text-brand-800 border-brand-200'
                      : 'bg-sand-100 text-sand-800 border-sand-300'
                  }`}
                >
                  {med.status === 'taken' ? 'Dose Taken' : 'Due Today'}
                </span>
              </div>

              <div className="space-y-2 py-3 border-y border-brand-50 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">Frequency:</span>
                  <span className="font-semibold text-brand-950">{med.frequency}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">Timing:</span>
                  <span className="font-semibold text-brand-950">{med.timing}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">Purpose:</span>
                  <span className="font-semibold text-brand-950">{med.purpose}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-2">
              <button
                onClick={() => toggleStatus(med.id)}
                className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition ${
                  med.status === 'taken'
                    ? 'bg-brand-50 text-brand-800 hover:bg-brand-100 border border-brand-200'
                    : 'bg-brand-600 text-white hover:bg-brand-700 shadow-2xs'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                {med.status === 'taken' ? 'Mark as Pending' : 'Mark as Taken'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
