'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback
} from 'react';
import { account, ID } from '@/appwrite/appwrite';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

// Check if Appwrite is configured
const isAppwriteConfigured = Boolean(
  process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT &&
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID
);

// Types
interface User {
  $id: string;
  name: string;
  email: string;
  emailVerification: boolean;
  prefs: Record<string, any>;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null
  });

  const router = useRouter();
  const locale = useLocale();

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      // Skip session check if Appwrite is not configured
      if (!isAppwriteConfigured) {
        setState((prev) => ({ ...prev, user: null, loading: false }));
        return;
      }

      try {
        const currentUser = await account.get();
        setState((prev) => ({
          ...prev,
          user: currentUser as User,
          loading: false
        }));
      } catch (error) {
        // No active session
        setState((prev) => ({ ...prev, user: null, loading: false }));
      }
    };

    checkSession();
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      if (!isAppwriteConfigured) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error:
            'Authentication service is not configured. Please contact the administrator.'
        }));
        throw new Error('Appwrite is not configured');
      }

      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        // Create email session
        await account.createEmailPasswordSession(email, password);

        // Get user data
        const userData = await account.get();
        setState((prev) => ({
          ...prev,
          user: userData as User,
          loading: false
        }));

        // Redirect to home page
        router.push(`/${locale}/home`);
      } catch (error: any) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error:
            error?.message || 'Login failed. Please check your credentials.'
        }));
        throw error;
      }
    },
    [router, locale]
  );

  const signup = useCallback(
    async (name: string, email: string, password: string) => {
      if (!isAppwriteConfigured) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error:
            'Authentication service is not configured. Please contact the administrator.'
        }));
        throw new Error('Appwrite is not configured');
      }

      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        // Create account
        await account.create(ID.unique(), email, password, name);

        // Automatically login after signup
        await account.createEmailPasswordSession(email, password);

        // Get user data
        const userData = await account.get();
        setState((prev) => ({
          ...prev,
          user: userData as User,
          loading: false
        }));

        // Redirect to home page
        router.push(`/${locale}/home`);
      } catch (error: any) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: error?.message || 'Signup failed. Please try again.'
        }));
        throw error;
      }
    },
    [router, locale]
  );

  const logout = useCallback(async () => {
    if (!isAppwriteConfigured) {
      setState((prev) => ({ ...prev, user: null, loading: false }));
      router.push(`/${locale}/auth/sign-in`);
      return;
    }

    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      // Delete current session
      await account.deleteSession('current');

      setState((prev) => ({ ...prev, user: null, loading: false }));

      // Redirect to sign in page
      router.push(`/${locale}/auth/sign-in`);
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error?.message || 'Logout failed. Please try again.'
      }));
      throw error;
    }
  }, [router, locale]);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  const value: AuthContextType = {
    ...state,
    login,
    signup,
    logout,
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// useAuth hook
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Export types for use in other components
export type { User, AuthState, AuthContextType };
