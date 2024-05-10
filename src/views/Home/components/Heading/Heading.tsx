import Link from 'next/link';

const Heading = () => {
  return (
    <div>
      <h1 className='w-full flex justify-center'>
        <Link
          href={'/create'}
          className='text-center text-3xl hover:font-bold mx-auto'
        >
          <span>[ Start a new coin ? ]</span>
        </Link>
      </h1>
    </div>
  );
};

export default Heading;
