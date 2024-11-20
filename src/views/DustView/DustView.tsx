import Container from '@/components/Container/Container';
import GoBackButton from '@/components/GoBackButton';
import MoonDustXCard from './components/ConvertCard/MoonDustXCard';

const DustView = () => {
  return (
    <Container className='mb-20'>
      <div className='flex  items-center flex-col  w-full'>
        <div className='w-4/5 max-w-[750px] mb-3 text-center'>
          <GoBackButton>[go back]</GoBackButton>
        </div>

        <div className='w-full mt-5'>
          <MoonDustXCard />
        </div>
      </div>
    </Container>
  );
};

export default DustView;
