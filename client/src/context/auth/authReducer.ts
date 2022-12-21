import { AuthAction, AuthState } from './authTypes';
import { emptyUser } from '../../helpers/accessToken';

export const authReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case 'setUser':
      return {
        ...state,
        user: action.payload,
      };

    case 'logout':
      return {
        user: emptyUser,
      };

    default:
      return state;
  }
};
