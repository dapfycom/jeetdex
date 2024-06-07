import { Button } from '@/components/ui/button';

const SubmitButton = ({
  lpIdentifier,
  isLoading
}: {
  lpIdentifier: string;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return (
      <Button className='mt-8' onClick={(e) => e.preventDefault()}>
        Loading...
      </Button>
    );
  }

  const button = (
    <Button type='submit' className='w-full mt-8' disabled={!lpIdentifier}>
      Add Initial Liquidity
    </Button>
  );

  return <>{button}</>;
};

export default SubmitButton;
