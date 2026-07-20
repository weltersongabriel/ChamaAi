import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthContextData {
  token: string | null;
  signIn: (token: string) => void;
  signOut: () => void;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("chamaai.token")
  );

  function signIn(newToken: string) {
    localStorage.setItem("chamaai.token", newToken);
    setToken(newToken);
  }

  function signOut() {
    localStorage.removeItem("chamaai.token");
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}