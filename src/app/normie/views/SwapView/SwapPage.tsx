import Container from '@/components/Container/Container';
import CreatePool from '@/components/CreatePoolModal/CreatePoolModal';
import dynamic from 'next/dynamic';
const SwapContent = dynamic(() => import('./SwapContent'), {
  ssr: false
});
const Swap = async () => {
  console.log('Render Swap');

  return (
    <Container>
      <div className='flex flex-col items-center text-center mt-5 mb-3'>
        <CreatePool
          className='text-center text-xl sm:text-3xl hover:font-bold mx-auto my-3 hover:bg-transparent'
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
