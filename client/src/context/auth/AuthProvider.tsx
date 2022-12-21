import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';
import { AuthState } from './authTypes';
import { getFromTheLS } from '../../helpers/localStorage';
import { handleAccessToken } from '../../helpers/accessToken';
import { ReactNode, useReducer } from 'react';
import { useLogoutLazyQuery } from '../../generated/types';

const initialState: AuthState = {
  user: handleAccessToken(getFromTheLS('accessToken')),
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);
  const [logoutMutaton, { client }] = useLogoutLazyQuery();

  const setUser = (accessToken: string) => {
    dispatch({ type: 'setUser', payload: handleAccessToken(accessToken) });
  };

  const logout = () => {
    logoutMutaton();
    client.clearStore();
    localStorage.clear();
    dispatch({ type: 'logout' });
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
