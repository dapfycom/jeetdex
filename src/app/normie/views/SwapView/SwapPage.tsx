import Container from '@/components/Container/Container';
import CreatePool from '@/components/CreatePoolModal/CreatePoolModal';
import { DialogTrigger } from '@/components/ui/dialog';
import SwapContent from './SwapContent';
const Swap = async () => {
  console.log('Render Swap');

  return (
    <Container>
      <div className='flex flex-col items-center text-center mt-5 mb-3'>
        <CreatePool>
          <DialogTrigger className='text-center text-xl sm:text-3xl hover:font-bold mx-auto my-3'>
            [ Start a new coin today ? ]
          </DialogTrigger>
        </CreatePool>
      </div>
      <SwapContent />
    </Container>
  );
};

export default Swap;
