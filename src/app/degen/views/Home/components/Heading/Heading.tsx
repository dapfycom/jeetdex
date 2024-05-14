import trandingImg from '@/assets/images/trending.png';
import Image from 'next/image';
import Link from 'next/link';
import CoinItem from '../TokensList/Coins/CoinItem';
import { coinsData } from '../TokensList/Coins/Coins';
const Heading = () => {
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
      <div className='w-full max-w-[400px] mx-auto mt-4'>
        <CoinItem {...coinsData[0]} />
      </div>
    </div>
  );
};

export default Heading;
