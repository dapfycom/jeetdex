'use client';
import Link from 'next/link';
import { useIsMaxCap } from '../../hooks';

const ReachedCapBox = () => {
  const { isMaxCap } = useIsMaxCap();
  if (!isMaxCap) {
    return null;
  }

  return (
    <div className='bg-green-300 w-fit p-4 text-gray-900 rounded-sm mb-5'>
      Jeetdex pool seeded! view the coin on dex{' '}
      <Link href={`${process.env.NEXT_PUBLIC_FRONTED_URL}/normie`}>
        <span className='text-blue-500'>here</span>
      </Link>
    </div>
  );
};

export default ReachedCapBox;
