'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
const GoBackButton = ({ children, ...props }) => {
  const router = useRouter();
  return (
    <Button
      variant='ghost'
      {...props}
      className={cn(
        'hover:bg-transparent hover:font-bold text-2xl',
        props.className
      )}
      onClick={() => {
        router.back();
      }}
    >
      {children}
    </Button>
  );
};

export default GoBackButton;
