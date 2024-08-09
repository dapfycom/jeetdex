'use client';
import { trendingAddress } from '@/app/degen/constants';
import trandingImg from '@/assets/images/trending.png';
import { formatTokenI } from '@/utils/mx-utils';
import Image from 'next/image';
import Link from 'next/link';
import { useFetchCoinsData } from '../../../hooks';
import CoinItem from '../TokensList/Coins/CoinItem';
import CoinSkeleton from '../TokensList/Coins/CoinSkeleton';

const Heading = () => {
  const { coinsData, isLoading } = useFetchCoinsData();
  const trendingCoin = coinsData.find(
    (coin) => coin.address === trendingAddress
  );
  return (
    <div>
      <h1 className='w-full flex justify-center'>
        <Link
          href={'/create'}
          className='text-center text-2xl sm:text-3xl hover:font-bold mx-auto font-semibold'
        >
          <span>[start a new coin]</span>
        </Link>
      </h1>

      <Image
        src={trandingImg}
        alt='trending now'
        className='mx-auto mt-5 max-w-[200px]'
      />
      {isLoading && (
        <div className='w-full max-w-[400px] mx-auto mt-4'>
          <CoinSkeleton />
        </div>
      )}
      {trendingCoin && (
        <div className='w-full max-w-[400px] mx-auto mt-4'>
          <CoinItem
            shake={false}
            imageUrl={trendingCoin.img}
            name={trendingCoin.title}
            ticker={formatTokenI(trendingCoin.firstTokenId)}
            marketCap={trendingCoin.marketCap}
            replies={trendingCoin.replies}
            username={trendingCoin.owner.username}
            address={trendingCoin.address}
            degenId={trendingCoin.degenId}
          />
        </div>
      )}
    </div>
  );
};

export default Heading;
