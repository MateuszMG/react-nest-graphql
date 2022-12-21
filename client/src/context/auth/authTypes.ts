import { UserFromJWT } from '../../helpers/accessToken';

export interface AuthState {
  user: UserFromJWT;
}

export type AuthAction =
  | { type: 'setUser'; payload: UserFromJWT }
  | { type: 'logout' };
