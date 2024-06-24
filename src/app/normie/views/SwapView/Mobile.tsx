import { IPoolPair } from '../PoolsView/utils/types';
import MobileNavbar from './commons/MobileNavbar/MobileNavbar';

const Mobile = ({ poolPair }: { poolPair: IPoolPair }) => {
  return (
    <div className='pb-[80px] h-full'>
      <MobileNavbar poolPair={poolPair} />
    </div>
  );
};

export default Mobile;
