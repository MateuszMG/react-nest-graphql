import { useEffect } from 'react';
import { Layout } from '../components/Layout/Layout';
import { paths } from './paths';
import { Roles } from '../const';
import { routesConfig } from './routesConfig';
import { useAuth } from '../hooks/useAuth';
import {
  Route,
  Routes as Switch,
  useLocation,
  useNavigate,
} from 'react-router-dom';

export const Routes = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const pathname = location.pathname.replaceAll('%20', ' ');
    const roles =
      routesConfig.find((item) => item.path === pathname)?.roles || [];

    !user?.id && roles?.includes(Roles.USER) && navigate(paths.login);
    user?.id && roles?.includes(Roles.NOT_LOGGED) && navigate(paths.profile);
  }, [location.pathname]);

  return (
    <Layout>
      <Switch>
        {routesConfig.map(({ component: Component, path }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Switch>
    </Layout>
  );
};
