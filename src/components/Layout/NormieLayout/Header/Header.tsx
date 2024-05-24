import Login from '@/components/Login/Login';
import Logo from '@/components/Logo/Logo';
import { MxLink } from '@/components/MxLink';
import SiteMode from '@/components/SiteMode/SiteMode';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className='flex flex-col sm:flex-row  items-start  justify-between pl-4 pr-4 pt-4'>
      <div className='flex gap-4 items-center'>
        <MxLink to={'/'} className='flex items-center justify-between gap-3'>
          <Logo className='rounded-full w-12 h-12' />
        </MxLink>

        <div className='text-sm sm:text-lg'>
          <div className='flex gap-2 items-center'>
            <Link href='/' className='hover:font-bold'>
              <span className='whitespace-nowrap'>swap</span>
            </Link>

            <Link href='/pools' className='hover:font-bold'>
              <span className='whitespace-nowrap'>pool</span>
            </Link>

            <Link href='/dust' className='hover:font-bold'>
              <span className='whitespace-nowrap'>dust</span>
            </Link>

            <Link href='#' className='hover:font-bold'>
              <span className='whitespace-nowrap'>more</span>
            </Link>
          </div>

          <div className='flex gap-2 items-center'></div>
        </div>
      </div>

      <nav className='h-full text-sm sm:relative  justify-end sm:bg-transparent flex items-center'>
        {process.env.DEGEN_MODE === 'true' && <SiteMode />}

        <div className='flex items-center gap-2'>
          <Login />
        </div>
      </nav>
    </header>
  );
};
