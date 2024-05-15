import Container from '@/components/Container/Container';
import {
  PageHeaderDescription,
  PageHeaderHeading
} from '@/components/PageHeader/PageHeader';
import CreatePoolsContainer from './CreatePoolsContainer';

const CreatePoolView = () => {
  return (
    <div>
      <Container>
        <div className='flex flex-col items-center text-center mt-5 mb-6'>
          <PageHeaderHeading className='mb-5'>Create Pool</PageHeaderHeading>

          <PageHeaderDescription>
            Create pools using the tokens you minted.
          </PageHeaderDescription>
        </div>
        <div className='flex flex-col items-center text-center mt-5'>
          <CreatePoolsContainer />
        </div>
      </Container>
    </div>
  );
};

export default CreatePoolView;
