import { TabsContent } from '@/components/ui/tabs';
import PoolsList from './PoolsListTable/PoolsListTable';

const PoolsContent = () => {
  return (
    <div className='w-full mt-5'>
      <TabsContent value='account'>
        <PoolsList />
      </TabsContent>
      <TabsContent value='password'>Change your password here.</TabsContent>
    </div>
  );
};

export default PoolsContent;
