import GoBackButton from '@/components/GoBackButton';
import MoonDustXCard from './components/ConvertCard/MoonDustXCard';

const DustView = () => {
  return (
    <>
      <div className='flex justify-center items-center flex-col mt-5 w-full'>
        <div className='w-4/5 max-w-[750px] mb-3'>
          <GoBackButton>[go back]</GoBackButton>
        </div>

        <div className='max-w-[750px] w-4/5'>
          <MoonDustXCard />
        </div>
      </div>
    </>
  );
};

export default DustView;
