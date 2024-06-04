'use client';
import { useListPools } from '../../../utils/hooks';
import { IPoolPair } from '../../../utils/types';
import PoolCard from './PoolCard';

interface IProps {
  pools: IPoolPair[];
}

const PoolListCards = ({ pools }: IProps) => {
  const orderedPools = useListPools(pools);
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {orderedPools.map((pool) => (
        <PoolCard key={pool.address} pool={pool} />
      ))}
    </div>
  );
};

export default PoolListCards;
