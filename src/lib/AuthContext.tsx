import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from './supabase';
import { Profile } from '../types';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_ADMIN_KEY = 'indokreasi_auth_admin';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth
  useEffect(() => {
    async function initAuth() {
      if (isSupabaseConfigured) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            setUser(session.user);
            await fetchProfile(session.user.id, session.user.email || '');
          }
        } catch (err) {
          console.warn('Supabase getSession error:', err);
        }

        // Listen for auth state changes
        const { data: authListener } = supabase.auth.onAuthStateChange(
          async (_event, session) => {
            if (session?.user) {
              setUser(session.user);
              await fetchProfile(session.user.id, session.user.email || '');
            } else {
              setUser(null);
              setProfile(null);
            }
          }
        );

        setLoading(false);
        return () => {
          authListener.subscription.unsubscribe();
        };
      } else {
        // Local demo auth session
        try {
          const stored = localStorage.getItem(LOCAL_ADMIN_KEY);
          if (stored) {
            const parsed = JSON.parse(stored);
            setUser({
              id: parsed.id || 'demo-admin-id',
              email: parsed.email || 'admin@indokreasi.id',
              app_metadata: {},
              user_metadata: {},
              aud: 'authenticated',
              created_at: new Date().toISOString(),
            } as User);
            setProfile({
              id: parsed.id || 'demo-admin-id',
              email: parsed.email || 'admin@indokreasi.id',
              full_name: parsed.full_name || 'Admin Indo Kreasi',
              avatar_url: parsed.avatar_url || null,
              role: 'admin',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            });
          }
        } catch (e) {
          console.warn('Local admin read error:', e);
        }
        setLoading(false);
      }
    }

    initAuth();
  }, []);

  async function fetchProfile(userId: string, email: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (!error && data) {
        setProfile(data as Profile);
      } else {
        // Default admin profile if not yet in table
        setProfile({
          id: userId,
          email,
          full_name: 'Administrator',
          avatar_url: null,
          role: 'admin',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.warn('Error fetching profile:', err);
    }
  }

  const signIn = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          return { success: false, error: error.message };
        }

        if (data.user) {
          setUser(data.user);
          await fetchProfile(data.user.id, data.user.email || '');
          return { success: true };
        }
        return { success: false, error: 'User not found' };
      } catch (err: any) {
        return { success: false, error: err.message || 'Login failed' };
      }
    } else {
      // Demo authentication: allow login with any password (demo credentials provided on login screen)
      if (!email.includes('@')) {
        return { success: false, error: 'Format email tidak valid' };
      }
      if (password.length < 4) {
        return { success: false, error: 'Kata sandi minimal 4 karakter' };
      }

      const demoAdmin: Profile = {
        id: 'admin-uuid-001',
        email,
        full_name: email.split('@')[0].toUpperCase(),
        avatar_url: null,
        role: 'admin',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(demoAdmin));
      setUser({
        id: demoAdmin.id,
        email: demoAdmin.email,
        app_metadata: {},
        user_metadata: {},
        aud: 'authenticated',
        created_at: demoAdmin.created_at,
      } as User);
      setProfile(demoAdmin);

      return { success: true };
    }
  };

  const signOut = async () => {
    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Supabase signOut error:', err);
      }
    }
    localStorage.removeItem(LOCAL_ADMIN_KEY);
    setUser(null);
    setProfile(null);
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (profile) {
      const updated: Profile = {
        ...profile,
        ...updates,
        updated_at: new Date().toISOString(),
      };
      setProfile(updated);

      if (isSupabaseConfigured && user) {
        try {
          await supabase.from('profiles').upsert(updated);
        } catch (err) {
          console.warn('Update profile error:', err);
        }
      } else {
        localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(updated));
      }
    }
  };

  const isAdmin = Boolean(profile?.role === 'admin' || user);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAdmin,
        loading,
        signIn,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
