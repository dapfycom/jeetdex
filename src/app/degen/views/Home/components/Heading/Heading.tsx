import trandingImg from '@/assets/images/trending.png';
import Image from 'next/image';
import Link from 'next/link';
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

      <Image
        src={trandingImg}
        alt='trending now'
        className='mx-auto mt-5 max-w-[200px]'
      />
    </div>
  );
};

export default Heading;
