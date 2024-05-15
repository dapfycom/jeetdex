import { Skeleton } from '@/components/ui/skeleton';

const PoolItemSkeleton = () => {
  return (
    <div className='flex items-center space-x-4'>
      <Skeleton className='h-12 w-12 rounded-full' />
      <div className='space-y-2 w-full'>
        <Skeleton className='h-10 w-full' />
      </div>
    </div>
  );
};

export default PoolItemSkeleton;
