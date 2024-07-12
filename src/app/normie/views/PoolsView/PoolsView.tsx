import Container from '@/components/Container/Container';
import { Tabs } from '@/components/ui/tabs';
import { fetchPoolsData } from '@/services/others/cache.server';
import GoBackButton from '../../../../components/GoBackButton';
import Options from './component/Options/Options';
import PoolsContent from './component/PoolsContent/PoolsContent';
const PoolsView = async () => {
  const pools = await fetchPoolsData();
  return (
    <Container className='w-full xl:max-w-[1000px]'>
      <div className='flex justify-center '>
        <GoBackButton>[go back]</GoBackButton>
      </div>
      <div className='flex flex-col items-center  mt-5 text-left'>
        <Tabs defaultValue='table' className='w-full'>
          <Options />
          <PoolsContent pools={pools} />
        </Tabs>
      </div>
    </Container>
  );
};

export default PoolsView;
