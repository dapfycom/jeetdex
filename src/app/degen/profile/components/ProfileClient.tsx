import ProfileLayout from '@/components/ProfileLayout/ProfileLayout';
import ProfileTabs from '@/components/ProfileLayout/Tabs';
import CoinsHeld from '@/components/ProfileLayout/TabsContent/CoinsHeld';
import Followers from '@/components/ProfileLayout/TabsContent/Followers';
import Following from '@/components/ProfileLayout/TabsContent/Following';
import Notifications from '@/components/ProfileLayout/TabsContent/Notifications';
import Replies from '@/components/ProfileLayout/TabsContent/Replies';
import CoinsCreated from './CoinsCreated';

const tabs = [
  {
    text: 'coins created',
    value: 'created',
    component: CoinsCreated
  },
  {
    text: 'coins held',
    value: 'held',
    component: CoinsHeld
  },
  {
    text: 'replies',
    value: 'replies',
    component: Replies
  },
  {
    text: 'notifications',
    value: 'notifications',
    component: Notifications
  },
  {
    text: 'followers',
    value: 'followers',
    component: Followers
  },
  {
    text: 'following',
    value: 'following',
    component: Following
  }
];

const ProfileClient = () => {
  return (
    <ProfileLayout>
      <ProfileTabs tabs={tabs} />
    </ProfileLayout>
  );
};

export default ProfileClient;
