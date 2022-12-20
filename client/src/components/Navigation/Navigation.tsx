import { paths } from '../../routes/paths';
import { separateString } from '../../helpers/strings';
import { useNavigate } from 'react-router-dom';
import {
  AuthLinksWrapper,
  Link,
  List,
  LogoutIcon,
  Nav,
  PersonIcon,
} from './Navigation.styled';
import { useProfileQuery } from '../../generated/graphql';

interface NavigationLinkProps {
  path: string;
}

const NavigationLink = ({ path }: NavigationLinkProps) => (
  <Link to={path}>{path === '/' ? 'Home' : separateString(path.slice(1))}</Link>
);

export const Navigation = () => {
  const navigate = useNavigate();

  const { data } = useProfileQuery();

  return (
    <Nav>
      <List>
        <NavigationLink path={paths.home} />

        <AuthLinksWrapper>
          {data?.profile.id ? (
            <>
              <PersonIcon onClick={() => navigate(paths.profile)} />
              <LogoutIcon
                onClick={() => {
                  // logoutApi(user._id!);
                  // dispatch(logout());
                }}
              />
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
