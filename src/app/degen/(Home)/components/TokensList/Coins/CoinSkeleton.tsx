import { Skeleton } from '@/components/ui/skeleton';

const CoinSkeleton = () => {
  return (
    <div className='w-full h-full '>
      <div className='animate-pulse flex space-x-6'>
        <Skeleton className='bg-slate-700 h-32 w-32' />
        <div className='flex-1 space-y-3 py-1'>
          <Skeleton className='h-3 bg-slate-700 rounded w-6/12' />
          <Skeleton className='h-2 bg-slate-700 rounded w-4/12' />
          <div className='space-y-3'>
            <div className='grid grid-cols-3 gap-4'>
              <Skeleton className='h-2 bg-slate-700 rounded col-span-1' />
            </div>
            <Skeleton className='h-3 bg-slate-700 rounded' />
            <Skeleton className='h-3 bg-slate-700 rounded' />
            <Skeleton className='h-3 bg-slate-700 rounded w-8/12' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinSkeleton;
