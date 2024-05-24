import ChartCard from '@/components/ChartCard/ChartCard';
import Container from '@/components/Container/Container';
import CreatePool from '@/components/CreatePoolModal/CreatePoolModal';
import { DialogTrigger } from '@/components/ui/dialog';
import SwapCardContainer from './commons/SwapCard/SwapCardContainer';
const Swap = () => {
  return (
    <Container>
      <div className='flex flex-col items-center text-center mt-5 mb-3'>
        <CreatePool>
          <DialogTrigger className='text-center text-3xl hover:font-bold mx-auto'>
            [ Start a new coin today ? ]
          </DialogTrigger>
        </CreatePool>
      </div>
      <div className='flex flex-col items-center text-center '>
        <div className='grid  grid-cols-1 md:grid-cols-[65%_35%] w-full gap-4'>
          <div className='h-full mt-[40px] rounded-2xl overflow-hidden md:block hidden'>
            <ChartCard />
          </div>
          <SwapCardContainer />
        </div>
      </div>
    </Container>
  );
};

export default Swap;
