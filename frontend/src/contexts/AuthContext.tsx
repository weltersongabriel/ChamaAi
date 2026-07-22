import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextData {
  token: string | null;
  signIn: (token: string) => void;
  signOut: () => void;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("chamaai.token");

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

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