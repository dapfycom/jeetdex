import Container from '@/components/Container/Container';
import Link from 'next/link';
import SwapCard from './commons/SwapCard';
const Swap = () => {
  return (
    <Container>
      <div className='flex flex-col items-center text-center mt-5 mb-10'>
        <h1 className='w-full flex justify-center'>
          <Link
            href={'/create'}
            className='text-center text-3xl hover:font-bold mx-auto'
          >
            <span>[ Start a new coin today ? ]</span>
          </Link>
        </h1>

        <h2 className='text-center text-gray-400 text-xl my-2'>
          Jeetdex makes it super easy to launch a coin in one click
        </h2>

        <div className='flex gap-5 text-xl'>
          <Link href='/' className='hover:font-bold'>
            <span className='whitespace-nowrap'>[swap]</span>
          </Link>

          <Link href='/pools' className='hover:font-bold'>
            <span className='whitespace-nowrap'>[pool]</span>
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
