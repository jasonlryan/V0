/* Future token-based functionality will need:
- Token storage in localStorage
- Token verification
- Automatic auth checking
- API endpoints for token verification
*/

import { createContext, useContext, useState, useEffect } from "react";
import { useDispatch as useReduxDispatch } from "react-redux";
import type { AppDispatch } from "../store"; // Import our typed dispatch
import { setUser, clearUser, setAuthError } from "../store/slices";
import { api } from "@/lib/api";
import type { User } from "../types";

// Import TEST_USERS from api
import { TEST_USERS } from "@/lib/api";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  error: string | null;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function AuthProvider({ children }) {
  const dispatch = useReduxDispatch<AppDispatch>(); // Use typed dispatch
  const [isLoading, setIsLoading] = useState(true);
  const [error, setLocalError] = useState<string | null>(null);
  const [user, setLocalUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userType = token === "mock-jwt-token-pro" ? "pro" : "free";
      const userData = TEST_USERS[userType].userData;
      setLocalUser(userData);
      dispatch(setUser(userData));
    }
    setIsLoading(false);
  }, [dispatch]);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      const { user, token } = await api.auth.login(credentials);
      localStorage.setItem("token", token);
      setLocalUser(user);
      dispatch(setUser(user));
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setLocalUser(null);
    dispatch(clearUser());
  };

  const handleError = (err: any) => {
    const message = err?.response?.data?.message || "An error occurred";
    setLocalError(message);
    dispatch(setAuthError(message));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* Future token-based implementation will include:

interface TokenAuthContextType extends AuthContextType {
  checkAuth: () => Promise<void>;
  handleError: (err: any) => void;
}

export function TokenBasedAuthProvider({ children }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setLocalError] = useState<string | null>(null);
  const [user, setLocalUser] = useState<User | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const userData = await api.auth.verify();
        dispatch(setUser(userData));
      }
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      setLocalError(null);
      const { user, token } = await api.auth.login(credentials);
      localStorage.setItem("token", token);
      dispatch(setUser(user));
      setLocalUser(user);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Invalid credentials";
      setLocalError(message);
      dispatch(setError(message));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    dispatch(clearUser());
  };

  const handleError = (err: any) => {
    const message = err instanceof Error ? err.message : "Invalid credentials";
    setLocalError(message);
    dispatch(setError(message));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading,
        checkAuth,
        handleError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
*/
