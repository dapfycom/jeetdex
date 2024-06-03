import Container from '@/components/Container/Container';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { IPoolPair } from '../PoolsView/utils/types';
import AddLiquidityCard from './components/AddLiquidityCard/AddLiquidityCard';

interface IProps {
  pool: IPoolPair;
}
const AddLiquidity = ({ pool }: IProps) => {
  return (
    <Container>
      <div className='w-full max-w-[800px] mx-auto'>
        <div className='mb-4'>
          <Link href={'/pools'}>
            <div className='text-muted-foreground'>
              <FontAwesomeIcon icon={faArrowLeft} /> Pools
            </div>
          </Link>
        </div>

        <AddLiquidityCard pool={pool} />
      </div>
    </Container>
  );
};

export default AddLiquidity;
