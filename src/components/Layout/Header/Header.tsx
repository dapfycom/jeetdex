import Login from '@/components/Login/Login';
import { MxLink } from '@/components/MxLink';
import SiteMode from '@/components/SiteMode/SiteMode';
import Image from 'next/image';
import mvxLogo from '../../../../public/assets/img/logo.png';

export const Header = () => {
  return (
    <header className='flex flex-row align-center justify-between pl-6 pr-6 pt-6'>
      <MxLink to={'/'} className='flex items-center justify-between gap-3'>
        <Image src={mvxLogo} alt='logo' className='w-16 h-16 rounded-full' />

        <span className='text-green-800 font-bold text-2xl'>JEETDEX</span>
      </MxLink>

      <nav className='h-full w-full text-sm sm:relative sm:left-auto sm:top-auto sm:flex sm:w-auto sm:flex-row sm:justify-end sm:bg-transparent'>
        <SiteMode />

        <div className='flex justify-end container mx-auto items-center gap-2'>
          <Login />
        </div>
      </nav>
    </header>
  );
};
