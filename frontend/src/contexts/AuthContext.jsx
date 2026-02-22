import React, { createContext, useCallback, useMemo, useState } from 'react';
import api from '../services/api';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('clickify:user');
    return raw ? JSON.parse(raw) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('clickify:token'));
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async ({ email, password }) => {
    setIsLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      const nextToken = data?.accessToken ?? data?.access_token ?? data?.token ?? null;
      const nextUser = data?.user ?? { email };

      if (nextToken) {
        localStorage.setItem('clickify:token', nextToken);
        setToken(nextToken);
      }
      localStorage.setItem('clickify:user', JSON.stringify(nextUser));
      setUser(nextUser);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('clickify:token');
    localStorage.removeItem('clickify:user');
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, token, isLoading, login, logout }),
    [user, token, isLoading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
