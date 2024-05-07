import Container from '@/components/Container/Container';
import {
  PageHeaderDescription,
  PageHeaderHeading
} from '@/components/PageHeader/PageHeader';
import SwapCard from './commons/SwapCard';
const Swap = () => {
  return (
    <Container>
      <div className='flex flex-col items-center text-center mt-5 mb-10'>
        <PageHeaderHeading className='mb-5'>
          <span className={'gradienteTitle'}>JEETDEX</span>
        </PageHeaderHeading>

        <PageHeaderDescription>
          Best meme token dex on MultiversX
        </PageHeaderDescription>
      </div>
      <div className='flex flex-col items-center text-center mt-5'>
        <SwapCard />
      </div>
    </Container>
  );
};

export default Swap;
