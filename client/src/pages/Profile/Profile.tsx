import { useProfileQuery } from '../../generated/types';

export const Profile = () => {
  const { data, loading, error, client } = useProfileQuery();
  const user = data?.profile;
  // console.log('data', data?.profile);
  // data && (data.profile.logged = false);
  // console.log('logged', data?.profile.logged);

  return (
    <div>
      <p> Email: {user?.email} </p>
      <p> Profile </p>
      <p> Profile </p>
    </div>
  );
};
