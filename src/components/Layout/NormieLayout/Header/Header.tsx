import Login from '@/components/Login/Login';
import Logo from '@/components/Logo/Logo';
import { MxLink } from '@/components/MxLink';
import SiteMode from '@/components/SiteMode/SiteMode';
import Navbar from './Navbar';

export const Header = () => {
  return (
    <header className='flex flex-col sm:flex-row  items-start  justify-between pl-4 pr-4 pt-4'>
      <div className='flex gap-4 items-center'>
        <MxLink to={'/'} className='flex items-center justify-between gap-3'>
          <Logo className='rounded-full w-12 h-12' />
        </MxLink>

        <Navbar />
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
