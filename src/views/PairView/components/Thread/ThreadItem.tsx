import { Badge } from '@/components/ui/badge';
import { Heart } from 'lucide-react';

const ThreadItem = () => {
  return (
    <div className='bg-secondary p-1 w-full'>
      <div className='flex gap-2 text-sm'>
        <Badge>erdfc34</Badge>
        <div className='text-muted-foreground'>
          {new Date().toLocaleString()}
        </div>
        <div className='flex items-center gap-1 text-sm hover:text-red-400 cursor-pointer'>
          <Heart size={'12px'} /> 0
        </div>
      </div>
      <div className='mt-2'>
        Bet shit ever, so like what&apos;s the plan? dev still holding? trump
        narrative brewing. cats be popping.
      </div>
    </div>
  );
};

export default ThreadItem;
