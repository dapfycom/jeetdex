import { cn } from '@/lib/utils';
import Chart from './components/Chart/Chart';
import DegenChats from './components/DegenChats/DegenChats';
import DegenTokenSocials from './components/DegenTokenSocials/DegenTokenSocials';
import Swap from './components/Swap/Swap';

const PairDesktop = () => {
  return (
    <div
      className={cn(
        'grid  grid-cols-1 md:grid-cols-[70%_30%] w-full gap-4 h-full'
      )}
    >
      <div className='h-full'>
        <Chart />

        <DegenChats />
      </div>

      <div>
        <Swap />

        <div className='flex flex-col gap-4'>
          <>
            <DegenTokenSocials />
            {/* <HoldersList tokenIdentifier={poolPair?.firstTokenId} /> */}
          </>
        </div>
      </div>
    </div>
  );
};

export default PairDesktop;
