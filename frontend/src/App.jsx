import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Layout } from './components/layout/Layout';

// Pages
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { Upload } from './pages/Upload';
import { Timeline } from './pages/Timeline';
import { MedicineManager } from './pages/MedicineManager';
import { EmergencyCard } from './pages/EmergencyCard';
import { DoctorPortal } from './pages/DoctorPortal';
import { PublicEmergencyView } from './pages/PublicEmergencyView';
import { DoctorView } from './pages/DoctorView';

export function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Public Emergency QR Access Routes (No Login Required) */}
          <Route path="/emergency-view/:token" element={<PublicEmergencyView />} />
          <Route path="/emergency/:token" element={<PublicEmergencyView />} />

          {/* Public Doctor Consultation View (No Login Required for Doctor with valid token) */}
          <Route path="/doctor-view/:token" element={<DoctorView />} />
          <Route path="/doctor/:token" element={<DoctorView />} />

          {/* Protected Patient Application Routes */}
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/medicines" element={<MedicineManager />} />
            <Route path="/emergency" element={<EmergencyCard />} />
            <Route path="/doctor-portal" element={<DoctorPortal />} />
          </Route>

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
