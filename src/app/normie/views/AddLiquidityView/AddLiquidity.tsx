import Container from '@/components/Container/Container';
import { IPoolPair } from '../PoolsView/utils/types';
import AddLiquidityCard from './components/AddLiquidityCard/AddLiquidityCard';

interface IProps {
  pool: IPoolPair;
}
const AddLiquidity = ({ pool }: IProps) => {
  return (
    <Container>
      <div className='w-full max-w-[800px] mx-auto pt-6'>
        <AddLiquidityCard pool={pool} />
      </div>
    </Container>
  );
};

export default AddLiquidity;
