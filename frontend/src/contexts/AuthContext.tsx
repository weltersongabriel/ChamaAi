import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextData {
  token: string | null;
  isAuthenticated: boolean;
  signIn: (token: string) => void;
  signOut: () => void;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | null>(() => {
    // Migration: read from memory only, not localStorage
    // Token will come from HttpOnly cookie via withCredentials
    return null;
  });

  const isAuthenticated = !!token;

  function signIn(newToken: string) {
    // Token now stored in HttpOnly cookie by backend
    // This function kept for compatibility during transition
    setToken(newToken);
  }

  function signOut() {
    // Backend will clear HttpOnly cookie via /auth/logout
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}