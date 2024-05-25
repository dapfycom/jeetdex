import Container from '@/components/Container/Container';
import { Tabs } from '@/components/ui/tabs';
import Heading from './component/Heading/Heading';
import Options from './component/Options/Options';
import PoolsContent from './component/PoolsContent/PoolsContent';

const PoolsView = () => {
  return (
    <Container>
      <div className='flex flex-col items-center  mt-5 text-left'>
        <Heading />
        <Tabs defaultValue='table' className='w-full'>
          <Options />
          <PoolsContent />
        </Tabs>
      </div>
    </Container>
  );
};

export default PoolsView;
