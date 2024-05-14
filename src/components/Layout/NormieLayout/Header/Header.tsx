import { MxLink } from '@/components/MxLink';
import SiteMode from '@/components/SiteMode/SiteMode';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Login from '../Login/Login';

export const Header = () => {
  return (
    <header className='flex flex-row items-center  justify-between pl-6 pr-6 pt-6'>
      <div className='flex gap-5'>
        <MxLink to={'/'} className='flex items-center justify-between gap-3'>
          <Image
            src={'/assets/img/logo.png'}
            alt='logo'
            className='w-10 h-10 rounded-full'
            width={30}
            height={30}
          />

          <span className='text-green-800 font-bold text-2xl'>JEETDEX</span>
        </MxLink>

        <div>
          <MxLink to='/create'>
            <span className='flex items-center'>
              <FontAwesomeIcon icon={faCoins} className='mr-3 w-5 h-5' />

              <span className='whitespace-nowrap'>List token</span>
            </span>
          </MxLink>
        </div>
      </div>

      <nav className='h-full w-full text-sm sm:relative  sm:flex sm:w-auto sm:flex-row sm:justify-end sm:bg-transparent'>
        <SiteMode />

        <div className='flex justify-end container mx-auto items-center gap-2'>
          <Login />
        </div>
      </nav>
    </header>
  );
};
