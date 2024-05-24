import Container from '@/components/Container/Container';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import AddLiquidityCard from './components/AddLiquidityCard/AddLiquidityCard';

interface IProps {
  lpToken: string;
}
const AddLiquidity = ({ lpToken }: IProps) => {
  return (
    <Container className='mt-8'>
      <div className='w-full max-w-[800px] mx-auto'>
        <div className='mb-4'>
          <Link href={'/pools'}>
            <div className='text-muted-foreground'>
              <FontAwesomeIcon icon={faArrowLeft} /> Pools
            </div>
          </Link>
        </div>
        <div className='ml-5 mb-6'>
          <h1 className='text-2xl'>Create a position</h1>
          <h2 className='text-muted-foreground text-sm'>
            Add liquidity to earn fees and rewards.
          </h2>
        </div>
        <AddLiquidityCard lpToken={lpToken} />
      </div>
    </Container>
  );
};

export default AddLiquidity;
