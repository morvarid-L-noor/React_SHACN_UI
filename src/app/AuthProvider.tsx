import cookies from 'js-cookie';
import type { FC, ReactNode } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';
import { accessTokenCookieName, roleCookieName } from '@/lib/constants';
import type { RoleType } from '@/@types/roles';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}
type TUser = {
  role: RoleType | undefined;
};
const isLoggedIn = !!cookies.get(accessTokenCookieName);
const role = cookies.get(roleCookieName) as RoleType | undefined;

// Create the authentication context
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: isLoggedIn,
  login: () => {},
  logout: () => {}
});

// Create the AuthProvider component
export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn);
  const [user, setUser] = useState<TUser>({ role });
  const login = () => {
    setIsAuthenticated(true);
  };
  const logout = () => {
    setIsAuthenticated(false);
  };

  const setUserData = (data: TUser) => {
    setUser(data);
  };

  const value = useMemo(() => ({ isAuthenticated, login, logout, user, setUserData }), [isAuthenticated, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
