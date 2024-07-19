'use client';
import trandingImg from '@/assets/images/trending.png';
import { formatTokenI } from '@/utils/mx-utils';
import Image from 'next/image';
import Link from 'next/link';
import { useFetchCoinsData } from '../../../hooks';
import CoinItem from '../TokensList/Coins/CoinItem';

const Heading = () => {
  const { coinsData } = useFetchCoinsData();

  return (
    <div>
      <h1 className='w-full flex justify-center'>
        <Link
          href={'/create'}
          className='text-center text-3xl hover:font-bold mx-auto'
        >
          <span>[ Start a new coin today ? ]</span>
        </Link>
      </h1>

      <h2 className='text-center text-gray-400 text-xl my-2'>
        Jeetdex makes it super easy to launch a coin in one click
      </h2>

      <Image
        src={trandingImg}
        alt='trending now'
        className='mx-auto mt-5 max-w-[200px]'
      />
      {coinsData[0] && (
        <div className='w-full max-w-[400px] mx-auto mt-4'>
          <CoinItem
            imageUrl={coinsData[0].img}
            name={coinsData[0].title}
            ticker={formatTokenI(coinsData[0].firstTokenId)}
            marketCap={coinsData[0].marketCap}
            replies={236}
            description={coinsData[0].description}
            username={coinsData[0].owner.username}
            address={coinsData[0].address}
          />
        </div>
      )}
    </div>
  );
};

export default Heading;
