import Login from '@/components/Login/Login';
import { MxLink } from '@/components/MxLink';
import { environment } from '@/config';
import Image from 'next/image';
import mvxLogo from '../../../../public/assets/img/multiversx-logo.svg';

export const Header = () => {
  return (
    <header className='flex flex-row align-center justify-between pl-6 pr-6 pt-6'>
      <MxLink to={''} className='flex items-center justify-between'>
        <Image src={mvxLogo} alt='logo' className='w-full h-6' />
      </MxLink>

      <nav className='h-full w-full text-sm sm:relative sm:left-auto sm:top-auto sm:flex sm:w-auto sm:flex-row sm:justify-end sm:bg-transparent'>
        <div className='flex justify-end container mx-auto items-center gap-2'>
          <Login />
          <div className='flex gap-1 items-center'>
            <div className='w-2 h-2 rounded-full bg-green-500' />
            <p className='text-gray-600'>{environment}</p>
          </div>
        </div>
      </nav>
    </header>
  );
};
