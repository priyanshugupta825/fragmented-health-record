import React from 'react';
import { Menu, LogOut, ShieldAlert, User, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const Navbar = ({ toggleMobile }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Patient';

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/85 backdrop-blur-md border-b border-brand-100 px-4 sm:px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleMobile}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-brand-50 focus:outline-none"
          aria-label="Toggle navigation"
        >
          <Menu className="w-5 h-5 text-brand-700" />
        </button>

        <div className="hidden sm:block">
          <span className="text-[11px] font-semibold text-brand-600 uppercase tracking-wider">
            ABDM Digital Health Ecosystem
          </span>
          <p className="text-sm font-semibold text-brand-950">
            Welcome back, <span className="text-brand-700 font-bold capitalize">{displayName}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Quick Emergency Button */}
        <button
          type="button"
          onClick={() => navigate('/emergency')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emergency-50 hover:bg-emergency-100 text-emergency-700 text-xs font-bold transition-colors border border-emergency-200 shadow-2xs animate-pulse"
        >
          <ShieldAlert className="w-4 h-4 text-emergency-600" />
          <span>Emergency QR</span>
        </button>

        {/* User Pill / Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-brand-100">
          <div className="w-8 h-8 rounded-full bg-brand-100 border border-brand-200 flex items-center justify-center text-brand-800 font-bold text-xs uppercase">
            {displayName.charAt(0)}
          </div>
          <button
            onClick={handleSignOut}
            title="Sign out"
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
