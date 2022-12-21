import { Home } from '../pages/Home/Home';
import { Login } from '../pages/Auth/Login';
import { paths } from './paths';
import { Profile } from '../pages/Profile/Profile';
import { Register } from '../pages/Auth/Register';
import { Roles } from '../const';
import { Products } from '../pages/Products/Products';

export const routesConfig = [
  {
    component: Home,
    path: paths.home,
    roles: [Roles.GUEST],
  },
  {
    component: Login,
    path: paths.login,
    roles: [Roles.NOT_LOGGED],
  },
  {
    component: Register,
    path: paths.register,
    roles: [Roles.NOT_LOGGED],
  },
  {
    component: Profile,
    path: paths.profile,
    roles: [Roles.USER],
  },
  {
    component: Products,
    path: paths.products,
    roles: [Roles.USER],
  },
];
