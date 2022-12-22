import { useAuth } from '../../hooks/useAuth';
import { paths } from '../../routes/paths';
import { separateString } from '../../helpers/strings';
import { useNavigate } from 'react-router-dom';
import {
  AuthLinksWrapper,
  Link,
  LinksWrapper,
  List,
  LogoutIcon,
  Nav,
  PersonIcon,
} from './Navigation.styled';

interface NavigationLinkProps {
  path: string;
}

const NavigationLink = ({ path }: NavigationLinkProps) => (
  <Link to={path}>{path === '/' ? 'Home' : separateString(path.slice(1))}</Link>
);

export const Navigation = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <Nav>
      <List>
        <NavigationLink path={paths.home} />

        <LinksWrapper>
          <NavigationLink path={paths.todo} />
          {user.id && <NavigationLink path={paths.products} />}
        </LinksWrapper>

        <AuthLinksWrapper>
          {user.id ? (
            <>
              <PersonIcon onClick={() => navigate(paths.profile)} />
              <LogoutIcon onClick={() => logout()} />
            </>
          ) : (
            <>
              <NavigationLink path={paths.login} />
              <NavigationLink path={paths.register} />
            </>
          )}
        </AuthLinksWrapper>
      </List>
    </Nav>
  );
};
