import Container from '@/components/Container/Container';
import {
  PageHeaderDescription,
  PageHeaderHeading
} from '@/components/PageHeader/PageHeader';
import { fetchNewPairFee } from '../utils/sc.queries';
import CreatePoolsContainer from './CreatePoolsContainer';
const CreatePoolView = async () => {
  const newPairFee = await fetchNewPairFee();
  return (
    <div>
      <Container>
        <div className='flex flex-col items-center text-center mt-5 mb-6'>
          <PageHeaderHeading className='mb-5'>Create Pool</PageHeaderHeading>

          <PageHeaderDescription>
            Create pools using the tokens you minted.{' '}
          </PageHeaderDescription>
          <PageHeaderDescription>
            <span className='text-primary'>
              Please do not close or reload the page while the pool is being
              created to ensure better experience.
            </span>
          </PageHeaderDescription>
        </div>
        <div className='flex flex-col items-center text-center mt-5'>
          <CreatePoolsContainer newPairFee={newPairFee} />
        </div>
      </Container>
    </div>
  );
};

export default CreatePoolView;
