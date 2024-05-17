import PoolItem from './PoolItem';

const PoolsList = () => {
  return (
    <div className='w-full'>
      <div className='w-full flex px-6 py-4 '>
        <span className='flex-[90%]'>Name</span>
        <span className='flex-[10%]'>Value</span>
        <span className='flex-[10%]'>Apr</span>
      </div>

      <div className='gap-4 flex flex-col'>
        <PoolItem />
        <PoolItem />
        <PoolItem />
        <PoolItem />
        <PoolItem />
        <PoolItem />
      </div>
    </div>
  );
};

export default PoolsList;
