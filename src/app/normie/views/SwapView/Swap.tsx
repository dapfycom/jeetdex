import Container from '@/components/Container/Container';
import CreatePool from '@/components/CreatePoolModal/CreatePoolModal';
import { DialogTrigger } from '@/components/ui/dialog';
import { fetchPoolsData } from '@/services/others/cache.server';
import SwapContent from './SwapContent';
import SwapContext from './SwapContext';
const Swap = async () => {
  const pools = await fetchPoolsData();

  return (
    <SwapContext poolsInfo={pools}>
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
    </SwapContext>
  );
};

export default Swap;
