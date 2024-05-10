import Heading from './components/Heading/Heading';
import TokensList from './components/TokensList/TokensList';

const HomeView = () => {
  return (
    <div className='flex flex-col h-full w-full'>
      <div className='mb-8'>
        <Heading />
      </div>
      <TokensList />
    </div>
  );
};

export default HomeView;
