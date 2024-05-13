import BottoomTabs from './components/BottomTabs/BottoomTabs';
import Chart from './components/Chart/Chart';
import Swap from './components/Swap/Swap';

const PairView = () => {
  return (
    <div className='w-full'>
      <div className='w-full grid sm:grid-cols-[auto_350px] grid-cols-1 gap-5'>
        <div className='grid grid-rows-[400px_auto] order-2 sm:order-1'>
          <Chart />
        </div>
        <div className='order-1 sm:order-2'>
          <Swap />
        </div>
      </div>
      <BottoomTabs />
    </div>
  );
};

export default PairView;
