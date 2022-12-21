import { makeVar } from '@apollo/client';
import { UserFromJWT } from '../helpers/accessToken';

export const userVar = makeVar<UserFromJWT | null>(null);
