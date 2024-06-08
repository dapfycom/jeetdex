import { Button } from '@/components/ui/button';
import { Address } from '@multiversx/sdk-core/out';
import { useRouter } from 'next/navigation';

const SubmitButton = ({
  pairAddress,
  isLoading
}: {
  pairAddress: string;
  isLoading: boolean;
}) => {
  const router = useRouter();
  const handleCreateLp = (e) => {
    e.preventDefault();

    router.push('/create/create-pool');
  };

  if (isLoading) {
    return (
      <Button className='mt-8 w-full ' onClick={(e) => e.preventDefault()}>
        Loading...
      </Button>
    );
  }

  let button = (
    <Button type='submit' className='w-full mt-8'>
      Enable Trade
    </Button>
  );

  if (Address.Zero().bech32() === pairAddress) {
    button = (
      <Button
        className='w-full mt-8'
        variant='destructive'
        onClick={handleCreateLp}
      >
        Pool not found - Create One
      </Button>
    );
  }
  return <>{button}</>;
};

export default SubmitButton;
