import PoolsList from './PoolsListTable/PoolsListTable';

const PoolsContent = async ({ pools }) => {
  return (
    <div className='w-full mt-5'>
      <PoolsList pools={pools} />
    </div>
  );
};

export default PoolsContent;
