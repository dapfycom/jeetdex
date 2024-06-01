import { IPoolPair } from '../../../utils/types';
import PoolCard from './PoolCard';

interface IProps {
  pools: IPoolPair[];
}

const PoolListCards = ({ pools }: IProps) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6'>
      {pools.map((pool) => (
        <PoolCard key={pool.address} pool={pool} />
      ))}
    </div>
  );
};

export default PoolListCards;
