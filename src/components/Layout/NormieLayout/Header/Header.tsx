import Login from '@/components/Login/normie/Login';
import Logo from '@/components/Logo/Logo';
import { MxLink } from '@/components/MxLink';
import SiteMode from '@/components/SiteMode/SiteMode';
import Link from 'next/link';
import Navbar from './Navbar';

export const Header = () => {
  return (
    <header className='flex flex-col sm:flex-row items-center sm:items-start  justify-between pl-4 pr-4 pt-4 gap-3'>
      <div className='flex gap-4 items-center'>
        <MxLink
          to={'/'}
          className=' items-center justify-between gap-3 hidden sm:flex'
        >
          <Logo className='rounded-full w-12 h-12' />
        </MxLink>

        <Navbar />
      </div>

      <div className='h-full text-sm sm:relative  justify-end sm:bg-transparent flex items-center'>
        {process.env.DEGEN_MODE === 'true' && <SiteMode />}

        <div className='relative'>
          <Login />

          <div className='absolute bottom-[-15px] right-[-10px] flex gap-2 hover:font-bold'>
            <Link href={'/profile'} className='whitespace-nowrap'>
              [View profile]
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
