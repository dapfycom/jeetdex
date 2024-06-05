import Login from '@/components/Login/normie/Login';
import Logo from '@/components/Logo/Logo';
import { MxLink } from '@/components/MxLink';
import SiteMode from '@/components/SiteMode/SiteMode';
import Navbar from './Navbar';
import ViewProfileButton from './ViewProfileButton';

export const Header = () => {
  return (
    <header className='relative flex flex-col sm:flex-row items-center sm:items-start  justify-between  gap-3 p-1'>
      <div className='flex gap-4 items-center'>
        <MxLink
          to={'/'}
          className=' items-center justify-between gap-3 hidden sm:flex'
        >
          <Logo className='rounded-full w-9 h-9' />
        </MxLink>

        <Navbar />
      </div>

      <div className='h-full text-sm sm:relative  justify-end sm:bg-transparent flex items-center'>
        {process.env.DEGEN_MODE === 'true' && <SiteMode />}

        <div className='relative'>
          <Login />

          <ViewProfileButton />
        </div>
      </div>
    </header>
  );
};
