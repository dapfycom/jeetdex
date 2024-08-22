import Container from '@/components/Container';
import {
  PageHeaderDescription,
  PageHeaderHeading
} from '@/components/PageHeader/PageHeader';
import HeroTagFqa from './common/FQA/HeroTagFqa';
import HeroTagForm from './common/HeroTagForm/HeroTagForm';

const HeroTagView = () => {
  return (
    <Container>
      <div className='flex flex-col items-center text-center mt-5'>
        <PageHeaderHeading className='mb-6'>
          <span className={'gradienteTitle'}>Create your Herotag</span>
        </PageHeaderHeading>
        <PageHeaderDescription className='mb-10'>
          Associate a herotag to your erd address in multiversx
        </PageHeaderDescription>

        <HeroTagForm />

        <HeroTagFqa />
      </div>
    </Container>
  );
};

export default HeroTagView;
