import DegenChart from '@/components/ChartCard/DegenChart';
import GoBackButton from '@/components/GoBackButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import BondingProgress from './components/BondingProgress/BondingProgress';
import DegenChats from './components/DegenChats/DegenChats';
import DegenHolderList from './components/DegenHolderList/DegenHolderList';
import DegenTokenSocials from './components/DegenTokenSocials/DegenTokenSocials';
import DegenTrades from './components/DegenTrades/DegenTrades';
import DegeUserTrades from './components/DegenTrades/DegeUserTrades';
import ReachedCapBox from './components/ReachedCapBox/ReachedCapBox';
import Swap from './components/Swap/Swap';

const PairDesktop = () => {
  return (
    <div className='w-full'>
      <GoBackButton className='mb-8'>[go back]</GoBackButton>

      <ReachedCapBox />

      <div
        className={cn(
          'grid  grid-cols-1 md:grid-cols-[70%_30%] w-full gap-4 h-full'
        )}
      >
        <div className='h-full flex flex-col gap-4'>
          <div className='h-[450px]'>
            <DegenChart />
          </div>

          <Tabs
            defaultValue='chats'
            className={cn('w-full rounded-sm bg-[#1C243E] border-none  p-4')}
          >
            <TabsList className='w-full justify-start flex bg-transparent'>
              <TabsTrigger value='chats'>chats</TabsTrigger>
              <TabsTrigger value='trades'>trades</TabsTrigger>
              <TabsTrigger value='my-trades'>my trades</TabsTrigger>
            </TabsList>
            <TabsContent value='chats'>
              {' '}
              <DegenChats />
            </TabsContent>
            <TabsContent value='trades'>
              <DegenTrades />
            </TabsContent>
            <TabsContent value='my-trades'>
              <DegeUserTrades />
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Swap />

          <div className='flex flex-col gap-4'>
            <>
              <DegenTokenSocials />
              <BondingProgress />
              <DegenHolderList />
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PairDesktop;
