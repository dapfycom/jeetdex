import DegenChart from '@/components/ChartCard/DegenChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { nav } from '@/localConstants';
import BondingProgress from '../BondingProgress/BondingProgress';
import DegenChats from '../DegenChats/DegenChats';
import DegenHolderList from '../DegenHolderList/DegenHolderList';
import DegenTokenSocials from '../DegenTokenSocials/DegenTokenSocials';
import DegenTrades from '../DegenTrades/DegenTrades';
import DegeUserTrades from '../DegenTrades/DegeUserTrades';
import Swap from '../Swap/Swap';
const MobileNav = ({ tab }: { tab: string }) => {
  return (
    <Tabs value={tab} defaultValue={nav[2].href}>
      <TabsContent value={nav[0].href} className='w-full flex flex-col gap-4'>
        <DegenTokenSocials />
        <BondingProgress />
        <DegenHolderList />
      </TabsContent>
      <TabsContent value={nav[1].href} className='w-full flex flex-col gap-4'>
        <div
          className='h-full'
          style={{
            height: 'calc(100vh - 300px)'
          }}
        >
          <DegenChart />
        </div>
      </TabsContent>
      <TabsContent value={nav[2].href} className='w-full flex flex-col gap-4'>
        <Swap />
        <DegenChats />
      </TabsContent>
      <TabsContent value={nav[3].href} className='w-full flex flex-col gap-4'>
        <Tabs
          defaultValue='trades'
          className={cn('w-full rounded-sm bg-[#1C243E] border-none  p-4')}
        >
          <TabsList className='w-full justify-start flex bg-transparent'>
            <TabsTrigger value='trades'>trades</TabsTrigger>
            <TabsTrigger value='my-trades'>my trades</TabsTrigger>
          </TabsList>

          <TabsContent value='trades'>
            <DegenTrades />
          </TabsContent>
          <TabsContent value='my-trades'>
            <DegeUserTrades />
          </TabsContent>
        </Tabs>
      </TabsContent>
    </Tabs>
  );
};

export default MobileNav;
