import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/hooks';
import { setActiveStep } from '../../../../utils/slice';
import { useGetPoolPair } from '../../../../utils/swr.hooks';

const SubmitButton = () => {
  const dispatch = useAppDispatch();
  const { exists } = useGetPoolPair();

  let button = (
    <Button type='submit' className='w-full mt-10'>
      Generate Pool Address
    </Button>
  );

  if (exists) {
    button = (
      <Button
        className='w-full mt-10'
        variant='destructive'
        onClick={(e) => {
          e.preventDefault();
          dispatch(setActiveStep('set-lp'));
        }}
      >
        Pool already exists - Next Step
      </Button>
    );
  }

  return <div>{button}</div>;
};

export default SubmitButton;
