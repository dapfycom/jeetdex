'use client';
import { useSearchParams } from 'next/navigation';
import { IPoolPair } from '../PoolsView/utils/types';
import MobileNavbar from './commons/MobileNavbar/MobileNavbar';
import { CommandDialogDemo } from './commons/Toolbar/SearchTokenDialog';

const Mobile = ({ poolPair }: { poolPair: IPoolPair }) => {
  const param = useSearchParams();
  const tab = param.get('tab');

  return (
    <div className='pb-[80px] h-full'>
      {tab !== 'buy/sell' && <CommandDialogDemo />}
      <MobileNavbar poolPair={poolPair} />
    </div>
  );
};

export default Mobile;
