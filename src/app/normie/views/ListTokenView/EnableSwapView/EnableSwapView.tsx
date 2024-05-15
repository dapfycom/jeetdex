import Container from '@/components/Container/Container';
import { PageHeaderHeading } from '@/components/PageHeader/PageHeader';
import EnableSwapForm from './EnableSwapForm';

const EnableSwapView = () => {
  return (
    <div>
      <Container>
        <div className='flex flex-col items-center text-center mt-5 mb-6'>
          <PageHeaderHeading className='mb-5'>Enable Trade</PageHeaderHeading>
        </div>
        <div className='flex flex-col items-center text-center mt-5'>
          <div className='bg-zinc-900 rounded-xl px-8 py-12 w-full text-left'>
            <EnableSwapForm />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default EnableSwapView;
