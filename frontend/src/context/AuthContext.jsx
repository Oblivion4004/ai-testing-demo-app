import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState(null);

  const login = useCallback((email, password) => {
    if (email === 'demo@lumiere.com' && password === 'password123') {
      setUser({ email, name: 'Demo User' });
      setAuthError(null);
      return true;
    }
    setAuthError('Invalid email or password. Try demo@lumiere.com / password123');
    return false;
  }, []);

  const register = useCallback((name, email, password) => {
    setUser({ email, name });
    setAuthError(null);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setAuthError(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, authError, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}