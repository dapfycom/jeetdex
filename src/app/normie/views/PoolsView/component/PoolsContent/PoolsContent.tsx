import { TabsContent } from '@/components/ui/tabs';
import PoolListCards from './PoolListCards/PoolListCards';
import PoolsList from './PoolsListTable/PoolsListTable';

const PoolsContent = () => {
  return (
    <div className='w-full mt-5'>
      <TabsContent value='table'>
        <PoolsList />
      </TabsContent>
      <TabsContent value='cards'>
        <PoolListCards />
      </TabsContent>
    </div>
  );
};

export default PoolsContent;
