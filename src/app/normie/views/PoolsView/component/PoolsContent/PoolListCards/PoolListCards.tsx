import PoolCard from './PoolCard';

const PoolListCards = () => {
  console.log('render');

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6'>
      <PoolCard />
      <PoolCard />
      <PoolCard />
      <PoolCard />
      <PoolCard />
      <PoolCard />
      <PoolCard />
      <PoolCard />
      <PoolCard />
      <PoolCard />
    </div>
  );
};

export default PoolListCards;
