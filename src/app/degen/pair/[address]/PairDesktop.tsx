import DegenChart from '@/components/ChartCard/DegenChart';
import GoBackButton from '@/components/GoBackButton';
import { cn } from '@/lib/utils';
import BondingProgress from './components/BondingProgress/BondingProgress';
import DegenChats from './components/DegenChats/DegenChats';
import DegenHolderList from './components/DegenHolderList/DegenHolderList';
import DegenTokenSocials from './components/DegenTokenSocials/DegenTokenSocials';
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

          <DegenChats />
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
