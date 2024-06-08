import RequiredLoginWrapper from '@/components/RequiredLoginWrapper/RequiredLoginWrapper';
import { Button } from '@/components/ui/button';

const SubmitButton = ({ onNextStep }: { onNextStep: () => void }) => {
  const button = (
    <RequiredLoginWrapper>
      <Button type='submit' className='w-full mt-2' onClick={onNextStep}>
        Next
      </Button>
    </RequiredLoginWrapper>
  );

  return <div>{button}</div>;
};

export default SubmitButton;
