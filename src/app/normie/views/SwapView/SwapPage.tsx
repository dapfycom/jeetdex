import Container from '@/components/Container/Container';
import CreatePool from '@/components/CreatePoolModal/CreatePoolModal';
import dynamic from 'next/dynamic';
const SwapContent = dynamic(() => import('./SwapContent'), {
  ssr: false
});
const Swap = async () => {
  console.log('Render Swap');

  return (
    <Container className='mt-12'>
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
