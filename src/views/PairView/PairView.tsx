import BottoomTabs from './components/BottomTabs/BottoomTabs';
import Chart from './components/Chart/Chart';
import Swap from './components/Swap/Swap';

const PairView = () => {
  return (
    <div className='w-full grid grid-cols-[auto_350px] gap-5'>
      <div className='grid grid-rows-[400px_auto]'>
        <Chart />
        <BottoomTabs />
      </div>
      <div>
        <Swap />
      </div>
    </div>
  );
};

export default PairView;
