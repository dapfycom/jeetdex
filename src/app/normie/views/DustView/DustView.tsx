import GoBackButton from '@/components/GoBackButton';
import MoonDustXCard from './components/ConvertCard/MoonDustXCard';

const DustView = () => {
  return (
    <>
      <div className='flex  items-center flex-col  w-full'>
        <div className='w-4/5 max-w-[750px] mb-3 text-center'>
          <GoBackButton>[go back]</GoBackButton>
        </div>

        <div className='w-full mt-5'>
          <MoonDustXCard />
        </div>
      </div>
    </>
  );
};

export default DustView;
