import ProtectRouteWrapper from '@/app/protect-route-wrapper';
import ProfileView from '../views/ProfileView/ProfileView';

const ProfilePage = async () => {
  return (
    <ProtectRouteWrapper>
      <ProfileView />
    </ProtectRouteWrapper>
  );
};

export default ProfilePage;
