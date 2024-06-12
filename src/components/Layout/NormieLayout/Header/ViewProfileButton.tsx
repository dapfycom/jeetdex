'use client';
import { useAuthentication } from '@/hooks';
import Link from 'next/link';

const ViewProfileButton = () => {
  const { isLoggedIn } = useAuthentication();
  if (!isLoggedIn) return null;
  return (
    <div className='absolute  bottom-[-25px]  sm:right-[5px] sm:translate-x-0 right-[0px]  flex gap-2 hover:font-bold'>
      <Link href={'/profile'} className='whitespace-nowrap'>
        [View profile]
      </Link>
    </div>
  );
};

export default ViewProfileButton;
