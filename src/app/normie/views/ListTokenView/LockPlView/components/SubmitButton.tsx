import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const SubmitButton = ({
  lpIdentifier,
  isLoading
}: {
  lpIdentifier: string;
  isLoading: boolean;
}) => {
  const router = useRouter();
  const handleCreateLp = (e) => {
    e.preventDefault();

    router.push('/create/create-pool');
  };

  if (isLoading) {
    return (
      <Button className='mt-8' onClick={(e) => e.preventDefault()}>
        Loading...
      </Button>
    );
  }

  let button = (
    <Button type='submit' className='w-full mt-8'>
      Lock Liquidity
    </Button>
  );

  if (!lpIdentifier) {
    button = (
      <Button
        className='w-full mt-8'
        variant='destructive'
        onClick={handleCreateLp}
      >
        LP not found - Create One
      </Button>
    );
  }
  return <>{button}</>;
};

export default SubmitButton;
