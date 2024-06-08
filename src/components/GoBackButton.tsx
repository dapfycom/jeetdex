'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
const GoBackButton = ({ children, ...props }) => {
  const router = useRouter();
  return (
    <Button
      variant='ghost'
      className='hover:bg-transparent hover:font-bold text-2xl'
      {...props}
      onClick={() => {
        router.back();
      }}
    >
      {children}
    </Button>
  );
};

export default GoBackButton;
