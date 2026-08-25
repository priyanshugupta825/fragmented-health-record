import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HeartPulse, ArrowRight, Lock, Mail, AlertCircle, Sparkles, Zap, ShieldCheck } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, instantDemoLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handle1ClickDemo = () => {
    instantDemoLogin('ravi.kumar@abdm.gov.in', 'Ravi Kumar');
    navigate('/dashboard');
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
          Unified Health Vault & AI Timeline for India's ABDM Ecosystem
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-brand-900/5 sm:rounded-3xl sm:px-10 border border-brand-100 space-y-6">
          
          {/* 1-Click Instant Demo Login Banner (Prominent for Judges) */}
          <div className="p-4 bg-gradient-to-r from-brand-100/90 via-brand-100 to-sand-100/80 border border-brand-200 rounded-2xl shadow-2xs space-y-2">
            <div className="flex items-center gap-2 text-brand-900">
              <Zap className="w-4 h-4 text-brand-600 fill-brand-600" />
              <span className="font-bold text-xs uppercase tracking-wider">Quick Hackathon Demo</span>
            </div>
            <p className="text-xs text-brand-950 leading-relaxed">
              Explore all features with pre-populated medical records, prescriptions, and lab history in 1 click.
            </p>
            <button
              type="button"
              onClick={handle1ClickDemo}
              className="w-full mt-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-2xs transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-200" />
              <span>Instant 1-Click Demo Login</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-brand-100"></div>
            <span className="flex-shrink mx-3 text-slate-400 text-xs font-semibold uppercase tracking-wider">Or Sign in with credentials</span>
            <div className="flex-grow border-t border-brand-100"></div>
          </div>

          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-2 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
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

          <div className="pt-2 text-center text-xs text-slate-500">
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
