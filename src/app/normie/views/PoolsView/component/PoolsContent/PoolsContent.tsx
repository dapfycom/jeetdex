import { TabsContent } from '@/components/ui/tabs';
import { fetchPoolsData } from '../../../../../../services/others/pools.server';
import PoolListCards from './PoolListCards/PoolListCards';
import PoolsList from './PoolsListTable/PoolsListTable';

const PoolsContent = async () => {
  const pools = await fetchPoolsData();

  console.log(pools);

  return (
    <div className='w-full mt-5'>
      <TabsContent value='table'>
        <PoolsList pools={pools} />
      </TabsContent>
      <TabsContent value='cards'>
        <PoolListCards pools={pools} />
      </TabsContent>
    </div>
  );
};

export default PoolsContent;
