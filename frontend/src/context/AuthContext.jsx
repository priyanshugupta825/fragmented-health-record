import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // Demo user for testing when Supabase credentials are not yet populated
  const [demoMode, setDemoMode] = useState(!isSupabaseConfigured());

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      // Local demo fallback
      const savedDemo = localStorage.getItem('demo_user');
      if (savedDemo) {
        const parsed = JSON.parse(savedDemo);
        setUser(parsed);
        setSession({ access_token: 'demo-token-12345', user: parsed });
      }
      setLoading(false);
      return;
    }

    // Get initial Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen to Supabase Auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    if (!isSupabaseConfigured()) {
      // Demo login
      const demoUser = {
        id: 'demo-user-123',
        email,
        user_metadata: {
          full_name: email.split('@')[0].toUpperCase(),
          abha_id: '91-4521-8890-4123',
        },
      };
      localStorage.setItem('demo_user', JSON.stringify(demoUser));
      setUser(demoUser);
      setSession({ access_token: 'demo-token-12345', user: demoUser });
      return { data: { user: demoUser, session: { access_token: 'demo-token-12345' } }, error: null };
    }
    return await supabase.auth.signInWithPassword({ email, password });
  };

  const signUp = async (email, password, metadata = {}) => {
    if (!isSupabaseConfigured()) {
      const demoUser = {
        id: 'demo-user-123',
        email,
        user_metadata: {
          full_name: metadata.full_name || 'Patient User',
          abha_id: metadata.abha_id || '91-4521-8890-4123',
          ...metadata,
        },
      };
      localStorage.setItem('demo_user', JSON.stringify(demoUser));
      setUser(demoUser);
      setSession({ access_token: 'demo-token-12345', user: demoUser });
      return { data: { user: demoUser, session: { access_token: 'demo-token-12345' } }, error: null };
    }
    return await supabase.auth.signUp({
      email,
      password,
      options: { data: metadata },
    });
  };

  const signOut = async () => {
    if (!isSupabaseConfigured()) {
      localStorage.removeItem('demo_user');
      setUser(null);
      setSession(null);
      return { error: null };
    }
    return await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        demoMode,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
