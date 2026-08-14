import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HeartPulse, ArrowRight, Lock, Mail, User, ShieldCheck, AlertCircle } from 'lucide-react';

export const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [abhaId, setAbhaId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const metadata = {
        full_name: fullName,
        abha_id: abhaId || '91-4521-8890-4123',
      };
      const { error: signUpError } = await signUp(email, password, metadata);
      if (signUpError) throw signUpError;
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to create profile. Please check your details.');
    } finally {
      setLoading(false);
    }
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
          Create Patient Profile
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500 font-medium">
          Connect your health journey with Ayushman Bharat Digital Mission (ABDM)
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-brand-900/5 sm:rounded-3xl sm:px-10 border border-brand-100">
          {error && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-2 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold text-brand-900 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <div className="relative rounded-xl shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-brand-400" />
                </div>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ravi Kumar"
                  className="block w-full pl-10 pr-3 py-2.5 sm:text-sm border border-brand-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition bg-brand-50/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-900 uppercase tracking-wider mb-1">
                ABHA ID (14 Digits - Optional)
              </label>
              <div className="relative rounded-xl shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <ShieldCheck className="h-4 w-4 text-brand-400" />
                </div>
                <input
                  type="text"
                  value={abhaId}
                  onChange={(e) => setAbhaId(e.target.value)}
                  placeholder="14-4321-9876-5432"
                  className="block w-full pl-10 pr-3 py-2.5 sm:text-sm border border-brand-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition font-mono bg-brand-50/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-900 uppercase tracking-wider mb-1">
                Email Address
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
                  placeholder="ravi.kumar@example.com"
                  className="block w-full pl-10 pr-3 py-2.5 sm:text-sm border border-brand-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition bg-brand-50/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-900 uppercase tracking-wider mb-1">
                Create Password
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
              className="w-full mt-2 flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50 transition"
            >
              {loading ? 'Creating Profile...' : 'Complete Registration'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            Already registered?{' '}
            <Link to="/login" className="font-bold text-brand-700 hover:text-brand-800 underline">
              Sign in to vault
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
