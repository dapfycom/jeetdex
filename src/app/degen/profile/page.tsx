import ProtectRouteWrapper from '@/app/protect-route-wrapper';
import ProfileClient from './components/ProfileClient';

const ProfilePage = () => {
  return (
    <ProtectRouteWrapper>
      <ProfileClient />
    </ProtectRouteWrapper>
  );
};

export default ProfilePage;
