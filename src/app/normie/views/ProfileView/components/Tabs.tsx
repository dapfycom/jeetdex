import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CoinsCreated from './TabsContent/CoinsCreated';
import CoinsHeld from './TabsContent/CoinsHeld';
import Followers from './TabsContent/Followers';
import Following from './TabsContent/Following';
import Notifications from './TabsContent/Notifications';
import Replies from './TabsContent/Replies';

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

const ProfileTabs = () => {
  return (
    <Tabs defaultValue={tabs[0].value} className='w-full '>
      <TabsList className='bg-transparent text-white gap-3  border-b rounded-none border-gray-600 pb-8 mb-4 flex-row flex-wrap h-fit justify-center'>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} asChild>
            <Button variant='ghost'>{tab.text}</Button>
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className='px-3 sm:px-8 w-full overflow-y-auto'
        >
          {<tab.component />}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default ProfileTabs;
