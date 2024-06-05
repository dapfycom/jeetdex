'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
const GoBackButton = () => {
  const router = useRouter();
  return (
    <Button
      variant='ghost'
      className='hover:bg-transparent hover:font-bold'
      onClick={() => {
        router.back();
      }}
    >
      [go back]
    </Button>
  );
};

export default GoBackButton;
