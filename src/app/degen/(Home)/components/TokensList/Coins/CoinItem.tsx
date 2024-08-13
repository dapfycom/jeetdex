import { TokenImageSRC } from '@/components/TokenImage/TokenImage';
import { cn } from '@/lib/utils';
import { formatBalance } from '@/utils/mx-utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface IProps {
  imageUrl: string;
  name: string;
  ticker: string;
  marketCap: string;
  replies: number;
  description?: string;
  username: string;
  address: string;
  degenId: string;
  shake: boolean;
}

const CoinItem = ({
  imageUrl,
  name,
  ticker,
  marketCap,
  replies,
  description,
  username,
  address,
  degenId,
  shake
}: IProps) => {
  const [shakeCoin, setShakeCoin] = useState(false);
  useEffect(() => {
    if (shake) {
      setShakeCoin(true);
      setTimeout(() => setShakeCoin(false), 500);
    }
  }, [shake]);
  return (
    <Link
      href={'/degen/pair/' + address}
      className={`grid  grid-cols-[100px_auto] sm:grid-cols-[128px_auto] gap-3 hover:border-white hover:border rounded-md h-fit p-3 ${
        shakeCoin ? 'animate-shake  bg-yellow-400' : ''
      }`}
    >
      <div className='relative w-[100px] sm:w-[128px] h-[auto]'>
        <TokenImageSRC
          src={imageUrl}
          alt={ticker}
          size={100}
          identifier={degenId}
        />
      </div>

      <div>
        <div className='flex flex-col gap-1'>
          <div className='text-xs text-muted-foreground'>
            Created by {username}
          </div>
          <div className='text-xs text-primary'>
            market cap: ${' '}
            {formatBalance({
              balance: marketCap,
              decimals: 6
            })}
          </div>
          <div className='text-xs text-gray-400'>replies: {replies}</div>

          <p className={cn('text-sm ', description && 'text-gray-400')}>
            <span className='font-bold'>
              {name} (ticker: {ticker})
            </span>
            {description && <span>: {description}</span>}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CoinItem;
