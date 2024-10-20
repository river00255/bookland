'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

type AuthState = {
  user: string | null;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthState>({
  user: null,
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  const login = () => {};

  const logout = () => {};

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
