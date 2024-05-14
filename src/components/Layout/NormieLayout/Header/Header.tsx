import Login from '@/components/Login/Login';
import Logo from '@/components/Logo/Logo';
import { MxLink } from '@/components/MxLink';
import SiteMode from '@/components/SiteMode/SiteMode';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className='flex flex-row items-center  justify-between pl-6 pr-6 pt-6'>
      <div className='flex gap-4 items-center'>
        <MxLink to={'/'} className='flex items-center justify-between gap-3'>
          <Logo className='rounded-full w-12 h-12' />
        </MxLink>

        <div>
          <div className='flex gap-2 items-center'>
            <a
              href='https://twitter.com/jeet_dex'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:font-bold'
            >
              [twitter]
            </a>

            <a
              href='https://twitter.com/jeet_dex'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:font-bold'
            >
              [support]
            </a>
          </div>

          <div className='flex gap-2 items-center'>
            <a
              href='https://twitter.com/jeet_dex'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:font-bold'
            >
              [telegram]
            </a>

            <a
              href='https://twitter.com/jeet_dex'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:font-bold'
            >
              [how it works]
            </a>
          </div>
        </div>

        <div className='text-gray-400 ml-7'>
          <Link href='/create' className='hover:text-gray-100'>
            <span className='flex items-center'>
              <FontAwesomeIcon icon={faCoins} className='mr-3 w-5 h-5' />

              <span className='whitespace-nowrap'>List token</span>
            </span>
          </Link>
        </div>
      </div>

      <nav className='h-full w-full text-sm sm:relative  sm:flex sm:w-auto sm:flex-row sm:justify-end sm:bg-transparent flex items-center'>
        <SiteMode />

        <div className='flex items-center gap-2'>
          <Login />
        </div>
      </nav>
    </header>
  );
};
