import Container from '@/components/Container/Container';
import { Tabs } from '@/components/ui/tabs';
import { fetchPoolsData } from '@/services/others/cache.server';
import Heading from './component/Heading/Heading';
import Options from './component/Options/Options';
import PoolsContent from './component/PoolsContent/PoolsContent';

const PoolsView = async () => {
  const pools = await fetchPoolsData();
  return (
    <Container>
      <div className='flex flex-col items-center  mt-5 text-left'>
        <Heading />
        <Tabs defaultValue='table' className='w-full'>
          <Options pools={pools} />
          <PoolsContent pools={pools} />
        </Tabs>
      </div>
    </Container>
  );
};

export default PoolsView;
