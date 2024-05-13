import Container from '@/components/Container/Container';
import {
  PageHeaderDescription,
  PageHeaderHeading
} from '@/components/PageHeader/PageHeader';
import CreatePoolForm from './components/CreatePoolForm';

const CreatePoolView = () => {
  return (
    <div>
      <Container>
        <div className='flex flex-col items-center text-center mt-5 mb-10'>
          <PageHeaderHeading className='mb-5'>Create Pool</PageHeaderHeading>

          <PageHeaderDescription>
            Create pools using the tokens you minted.
          </PageHeaderDescription>
        </div>
        <div className='flex flex-col items-center text-center mt-5'>
          <CreatePoolForm />
        </div>
      </Container>
    </div>
  );
};

export default CreatePoolView;
