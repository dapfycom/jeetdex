import DegenChart from '@/components/ChartCard/DegenChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { nav } from '@/localConstants';
import DegenChats from '../DegenChats/DegenChats';
import DegenHolderList from '../DegenHolderList/DegenHolderList';
import DegenTokenSocials from '../DegenTokenSocials/DegenTokenSocials';
import Swap from '../Swap/Swap';
const MobileNav = ({ tab }: { tab: string }) => {
  return (
    <Tabs value={tab} defaultValue={nav[2].href}>
      <TabsContent value={nav[0].href} className='w-full'>
        <DegenTokenSocials />
        <DegenHolderList />
      </TabsContent>
      <TabsContent value={nav[1].href} className='w-full'>
        <div
          className='h-full'
          style={{
            height: 'calc(100vh - 300px)'
          }}
        >
          <DegenChart />
        </div>
      </TabsContent>
      <TabsContent value={nav[2].href} className='w-full'>
        <Swap />
        <DegenChats />
      </TabsContent>
      <TabsContent value={nav[3].href} className='w-full'>
        <Tabs
          defaultValue='trades'
          className={cn('w-full rounded-sm bg-[#1C243E] border-none  p-4')}
        >
          <TabsList className='w-full justify-start flex bg-transparent'>
            <TabsTrigger value='trades'>trades</TabsTrigger>
            <TabsTrigger value='my-trades'>my trades</TabsTrigger>
          </TabsList>

          {/* <TabsContent value='trades'>
            <Trades
              poolAddress={withDefaultPool?.address}
              poolFirstToken={withDefaultPool?.firstToken}
              poolSecondToken={withDefaultPool?.secondToken}
            />
          </TabsContent>
          <TabsContent value='my-trades'>
            <UserTrades poolPair={withDefaultPool} />
          </TabsContent> */}
        </Tabs>
      </TabsContent>
    </Tabs>
  );
};

export default MobileNav;
