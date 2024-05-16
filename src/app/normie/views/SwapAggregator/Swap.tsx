import Container from '@/components/Container/Container';
import Link from 'next/link';
import SwapCard from './commons/SwapCard';
const Swap = () => {
  return (
    <Container>
      <div className='flex flex-col items-center text-center mt-5 mb-10'>
        <div className='flex gap-5 text-xl'>
          <Link href='/' className='hover:font-bold'>
            <span className='whitespace-nowrap'>[swap]</span>
          </Link>

          <Link href='/create' className='hover:font-bold'>
            <span className='whitespace-nowrap'>[list token]</span>
          </Link>

          <Link href='/dust' className='hover:font-bold'>
            <span className='whitespace-nowrap'>[dust]</span>
          </Link>
        </div>
      </div>
      <div className='flex flex-col items-center text-center mt-5'>
        <SwapCard />
      </div>
    </Container>
  );
};

export default Swap;
