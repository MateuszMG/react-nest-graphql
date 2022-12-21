import { createContext } from 'react';
import { AuthState } from './authTypes';

export type AuthContextProps = {
  authState: AuthState;
  setUser: (accessToken: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
);
