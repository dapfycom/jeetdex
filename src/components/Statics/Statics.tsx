'use client';
import { formatTokenI } from '@/utils/mx-utils';
import useGetStatics from './useGetStatics';

const Statics = () => {
  const { data } = useGetStatics();
  if (!data) return null;
  console.log(data);

  return (
    <div className='px-2 flex gap-x-10 flex-wrap mt-10 lg:mt-0'>
      <div className='flex gap-2 flex-wrap'>
        Top gainers:{' '}
        <div className='flex gap-4'>
          {data.topGainers.map((stats) => (
            <Child key={stats.token} stats={stats} type='topGainers' />
          ))}
        </div>
      </div>
      <div className='flex gap-2 flex-wrap'>
        Top losers:{' '}
        <div className='flex gap-4'>
          {data.topLosers.map((stats) => (
            <Child key={stats.token} stats={stats} type='topLosers' />
          ))}
        </div>
      </div>
    </div>
  );
};

const Child = ({
  stats,
  type
}: {
  stats: {
    token: string;
    percentageChange: number;
  };
  type: 'topGainers' | 'topLosers';
}) => {
  return (
    <div className='flex gap-2'>
      <div>{formatTokenI(stats.token)}</div>

      <div
        className={type === 'topGainers' ? 'text-green-500' : 'text-red-500'}
      >
        {stats.percentageChange.toFixed(2)}%
      </div>
    </div>
  );
};

export default Statics;
