import Container from '@/components/Container/Container';
import { PageHeaderHeading } from '@/components/PageHeader/PageHeader';

import dynamic from 'next/dynamic';

const LockLpForm = dynamic(() => import('./components/LockLpForm'), {
  ssr: false
});

const LockPlView = () => {
  return (
    <div>
      <Container>
        <div className='flex flex-col items-center text-center mt-5 mb-6'>
          <PageHeaderHeading className='mb-5'>Lock Liquidity</PageHeaderHeading>
        </div>
        <div className='flex flex-col items-center text-center mt-5'>
          <LockLpForm />
        </div>
      </Container>
    </div>
  );
};

export default LockPlView;
