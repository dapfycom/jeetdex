import Container from '@/components/Container/Container';
import CreatePool from '@/components/CreatePoolModal/CreatePoolModal';
import SwapContent from './SwapContent';

const Swap = async () => {
  return (
    <Container className='sm:mt-12'>
      <div className=' flex-col items-center text-center mb-5 lg:mb-6 hidden sm:flex'>
        <CreatePool
          className='text-center text-xl sm:text-3xl hover:font-bold mx-auto  hover:bg-transparent'
          variant='ghost'
        >
          [ Start a new pool today ? ]
        </CreatePool>
      </div>
      <SwapContent />
    </Container>
  );
};

export default Swap;
