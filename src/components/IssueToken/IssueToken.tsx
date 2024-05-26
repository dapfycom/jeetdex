import { PageHeaderHeading } from '../PageHeader/PageHeader';
import IssueTokenForm from './IssueTokenForm';

const IssueToken = () => {
  return (
    <div>
      <div>
        <div className='flex flex-col items-center text-center mt-5 mb-6'>
          <PageHeaderHeading className='mb-5 text-2xl  md:text-3xl '>
            Issue Token
          </PageHeaderHeading>
        </div>

        <div className='flex flex-col items-center mt-5'>
          <IssueTokenForm />
        </div>
      </div>
    </div>
  );
};

export default IssueToken;
