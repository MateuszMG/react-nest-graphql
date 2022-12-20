import * as jwt from 'jsonwebtoken';
import { UserRoles } from 'src/features/users/user.model';

const accessTokenSecret = 'accessTokenSecret';
const refreshTokenSecret = 'refreshTokenSecret';

export interface DataToJWT {
  id: string;
  username: string;
  roles: UserRoles[];
  email: string;
}

export const createAccessToken = (payload: DataToJWT) =>
  jwt.sign(payload, accessTokenSecret, { expiresIn: '1m' });

export const createRefreshToken = (payload: DataToJWT) =>
  jwt.sign(payload, refreshTokenSecret, { expiresIn: '1y' });

export const decodeAccessToken = (token: string) =>
  !token
    ? null
    : jwt.verify(token, accessTokenSecret, (err, data) => (err ? null : data));
