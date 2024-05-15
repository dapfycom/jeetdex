import Login from '@/components/Login/Login';
import Logo from '@/components/Logo/Logo';
import { MxLink } from '@/components/MxLink';
import SiteMode from '@/components/SiteMode/SiteMode';

export const Header = () => {
  return (
    <header className='flex flex-row items-center  justify-between pl-6 pr-6 pt-6'>
      <div className='flex gap-4'>
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
              href='https://t.me/jeetdex'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:font-bold'
            >
              [telegram]
            </a>
          </div>

          <div className='flex gap-2 items-center'>
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
