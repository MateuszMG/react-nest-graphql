import { useProfileQuery } from '../../generated/graphql';

interface ProfileProps {}

export const Profile = ({}: ProfileProps) => {
  const { data, loading, error } = useProfileQuery();
  const user = data?.profile;
  console.log('data', data);
  console.log('loading', loading);
  console.log('error', error);

  return (
    <div>
      <p> Email: {user?.email} </p>
      <p> Profile </p>
      <p> Profile </p>
    </div>
  );
};
