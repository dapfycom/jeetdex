'use client';
import { useIsMaxCap } from '../../hooks';

const TradeOnDexBox = () => {
  const { isMaxCap } = useIsMaxCap();
  if (!isMaxCap) {
    return null;
  }

  return (
    <div className='bg-blue-300 w-fit p-2 text-gray-900 rounded-sm '>
      Trade on normie dex vie degen{' '}
    </div>
  );
};

export default TradeOnDexBox;
