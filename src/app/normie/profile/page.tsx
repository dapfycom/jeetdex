import { getSession } from '@/utils/server-utils/sessions';
import { redirect } from 'next/navigation';
import ProfileView from '../views/ProfileView/ProfileView';

const ProfilePage = async () => {
  const session = await getSession();

  if (!session) {
    redirect('/');
  }

  return <ProfileView />;
};

export default ProfilePage;
