import { Button } from '@/components/ui/button';
import { useGetPoolPair } from '../../../utils/swr.hooks';

const SubmitButton = ({ onNextStep }: { onNextStep: () => void }) => {
  const { exists, tokens } = useGetPoolPair();
  console.log(tokens);

  let button = (
    <Button type='submit' className='w-full mt-2' onClick={() => {}}>
      Generate Pool Address
    </Button>
  );

  if (exists) {
    button = (
      <Button
        className='w-full mt-2'
        variant='destructive'
        onClick={(e) => {
          e.preventDefault();
          onNextStep();
        }}
      >
        Pool already exists - Next Step
      </Button>
    );
  }

  return <div>{button}</div>;
};

export default SubmitButton;
