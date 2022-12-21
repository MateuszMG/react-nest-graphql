import { AuthContext } from '../context/auth/AuthContext';
import { useContext } from 'react';

export const useAuth = () => {
  const { authState, logout, setUser } = useContext(AuthContext);

  return {
    ...authState,
    logout,
    setUser,
  };
};
