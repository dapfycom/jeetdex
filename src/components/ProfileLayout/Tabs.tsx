import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProfileTabs = ({
  tabs
}: {
  tabs: {
    text: string;
    value: string;
    component: React.FC;
  }[];
}) => {
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
