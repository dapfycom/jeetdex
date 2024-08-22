'use client';
import Container from '@/components/Container';
import { PageHeaderHeading } from '@/components/PageHeader/PageHeader';
import FormikContainer from './common/FormikContainer/FormikContainer';

function XPaymentPageView() {
  return (
    <Container>
      <div className='flex text-center flex-col items-center  mt-5'>
        <PageHeaderHeading className='mb-6'>
          <span className={'gradienteTitle'}>
            Track your payments on Multiversx
          </span>
        </PageHeaderHeading>
      </div>
      <FormikContainer />
    </Container>
  );
}

export default XPaymentPageView;
