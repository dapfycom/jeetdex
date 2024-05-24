import {
  PageHeaderDescription,
  PageHeaderHeading
} from '@/components/PageHeader/PageHeader';
import CreatePoolsContainer from './CreatePoolsContainer';
const CreatePoolView = () => {
  const newPairFee = '13200000000';
  return (
    <div>
      <div>
        <div className='flex flex-col items-center text-center mt-5 mb-6'>
          <PageHeaderHeading className='mb-5 text-2xl  md:text-3xl '>
            Create Pool
          </PageHeaderHeading>

          <PageHeaderDescription>
            Create pools using the tokens you minted.{' '}
          </PageHeaderDescription>
        </div>
        <div className='flex flex-col items-center text-center mt-5'>
          <CreatePoolsContainer newPairFee={newPairFee} />
        </div>
      </div>
    </div>
  );
};

export default CreatePoolView;
