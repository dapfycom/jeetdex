'use client';
import trandingImg from '@/assets/images/trending.png';
import { formatTokenI } from '@/utils/mx-utils';
import Image from 'next/image';
import Link from 'next/link';
import { useFetchCoinsData } from '../../../hooks';
import CoinItem from '../TokensList/Coins/CoinItem';
import CoinSkeleton from '../TokensList/Coins/CoinSkeleton';

const Heading = () => {
  const { coinsData, isLoading } = useFetchCoinsData();

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
      {coinsData[0] && (
        <div className='w-full max-w-[400px] mx-auto mt-4'>
          <CoinItem
            shake={false}
            imageUrl={coinsData[0].img}
            name={coinsData[0].title}
            ticker={formatTokenI(coinsData[0].firstTokenId)}
            marketCap={coinsData[0].marketCap}
            replies={coinsData[0].replies}
            username={coinsData[0].owner.username}
            address={coinsData[0].address}
            degenId={coinsData[0].degenId}
          />
        </div>
      )}
    </div>
  );
};

export default Heading;
