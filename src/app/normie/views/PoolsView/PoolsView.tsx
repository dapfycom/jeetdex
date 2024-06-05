import Container from '@/components/Container/Container';
import { Tabs } from '@/components/ui/tabs';
import { fetchPoolsData } from '@/services/others/cache.server';
import GoBackButton from './component/GoBackButton';
import Options from './component/Options/Options';
import PoolsContent from './component/PoolsContent/PoolsContent';
const PoolsView = async () => {
  const pools = await fetchPoolsData();
  return (
    <Container className='max-w-[600px]  xl:max-w-[1000px]'>
      <GoBackButton />
      <div className='flex flex-col items-center  mt-5 text-left'>
        <Tabs defaultValue='table' className='w-full'>
          <Options pools={pools} />
          <PoolsContent pools={pools} />
        </Tabs>
      </div>
    </Container>
  );
};

export default PoolsView;
