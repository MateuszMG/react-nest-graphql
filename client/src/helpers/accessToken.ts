import { addToLS, removeFromLS } from './localStorage';
import { UserRoles } from '../const';
import jwtDecode from 'jwt-decode';

export interface UserFromJWT {
  email: string;
  id: string;
  roles: UserRoles[];
  username: string;
  exp: number;
  iat: number;
}

export const emptyUser: UserFromJWT = {
  email: '',
  exp: 0,
  iat: 0,
  id: '',
  roles: [],
  username: '',
};

export const handleAccessToken = (accessToken: string): UserFromJWT => {
  let user = null;

  try {
    user = jwtDecode(accessToken);
  } catch (err) {}

  if (!user) {
    removeFromLS('accessToken');
    return emptyUser;
  }

  addToLS('accessToken', accessToken);
  return user as UserFromJWT;
};
