"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { currentPoster, currentTeam } from "@/lib/data";
import { AUTH_STORAGE_KEY, homeForRole } from "@/lib/auth";
import type { User, UserRole } from "@/lib/types";

export interface AuthSession {
  user: User;
  role: UserRole;
}

interface AuthContextValue {
  user: User | null;
  role: UserRole | null;
  ready: boolean;
  login: (input: { email: string; role: UserRole }) => AuthSession;
  register: (input: {
    name: string;
    email: string;
    role: UserRole;
    company?: string;
    phone: string;
    location: string;
  }) => AuthSession;
  logout: () => void;
  homePath: string | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function userForRole(role: UserRole, overrides?: Partial<User>): User {
  const base = role === "team" ? currentTeam : currentPoster;
  return { ...base, role, ...overrides };
}

function readSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuthSession;
    if (!parsed?.user?.role || !parsed?.role) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeSession(session: AuthSession | null) {
  if (typeof window === "undefined") return;
  if (!session) {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return;
  }
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSession(readSession());
    setReady(true);
  }, []);

  const login = useCallback(({ email, role }: { email: string; role: UserRole }) => {
    const next: AuthSession = {
      role,
      user: userForRole(role, { email }),
    };
    writeSession(next);
    setSession(next);
    return next;
  }, []);

  const register = useCallback(
    (input: {
      name: string;
      email: string;
      role: UserRole;
      company?: string;
      phone: string;
      location: string;
    }) => {
      const next: AuthSession = {
        role: input.role,
        user: userForRole(input.role, {
          name: input.name,
          email: input.email,
          company: input.company,
          phone: input.phone,
          location: input.location,
        }),
      };
      writeSession(next);
      setSession(next);
      return next;
    },
    [],
  );

  const logout = useCallback(() => {
    writeSession(null);
    setSession(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      role: session?.role ?? null,
      ready,
      login,
      register,
      logout,
      homePath: session ? homeForRole(session.role) : null,
    }),
    [session, ready, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
