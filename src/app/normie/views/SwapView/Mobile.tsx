import { IPoolPair } from '../PoolsView/utils/types';
import MobileNavbar from './commons/MobileNavbar/MobileNavbar';
import { CommandDialogDemo } from './commons/Toolbar/SearchTokenDialog';

const Mobile = ({ poolPair }: { poolPair: IPoolPair }) => {
  return (
    <div className='pb-[80px] h-full'>
      <CommandDialogDemo />
      <MobileNavbar poolPair={poolPair} />
    </div>
  );
};

export default Mobile;
