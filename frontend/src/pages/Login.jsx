import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HeartPulse, ArrowRight, Lock, Mail, AlertCircle, Sparkles } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, demoMode } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: signInError } = await signIn(email, password);
      if (signInError) throw signInError;
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to sign in. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = () => {
    setEmail('patient.demo@abdm.gov.in');
    setPassword('demo123456');
  };

  return (
    <div className="min-h-screen bg-brand-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-3xl bg-brand-600 flex items-center justify-center text-white shadow-lg shadow-brand-600/20">
            <HeartPulse className="w-9 h-9" />
          </div>
        </div>
        <h2 className="mt-4 text-center text-2xl sm:text-3xl font-extrabold text-brand-950 tracking-tight">
          Fragmented Health Record
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500 font-medium">
          Unifying India's healthcare journey across hospitals, labs & clinics
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-brand-900/5 sm:rounded-3xl sm:px-10 border border-brand-100">
          {demoMode && (
            <div className="mb-6 p-3.5 bg-brand-100/70 border border-brand-200 rounded-2xl flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" />
              <div className="text-xs text-brand-900">
                <span className="font-bold block">Demo Environment Active</span>
                Enter any email or click below to auto-fill demo patient credentials.
                <button
                  type="button"
                  onClick={handleQuickDemo}
                  className="mt-1 text-brand-700 underline font-bold hover:text-brand-900 block"
                >
                  Fill Demo Credentials
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-2 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold text-brand-900 uppercase tracking-wider mb-1">
                Email / ABHA ID
              </label>
              <div className="relative rounded-xl shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-brand-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="patient@abdm.gov.in"
                  className="block w-full pl-10 pr-3 py-2.5 sm:text-sm border border-brand-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition bg-brand-50/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-900 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative rounded-xl shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-brand-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-3 py-2.5 sm:text-sm border border-brand-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition bg-brand-50/20"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50 transition"
            >
              {loading ? 'Authenticating...' : 'Sign In to Health Vault'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            Don't have an account?{' '}
            <Link to="/signup" className="font-bold text-brand-700 hover:text-brand-800 underline">
              Create ABHA profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
