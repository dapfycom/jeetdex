import Login from '@/components/Login/Login';
import Logo from '@/components/Logo/Logo';
import { MxLink } from '@/components/MxLink';
import SiteMode from '@/components/SiteMode/SiteMode';

export const Header = () => {
  return (
    <header className='flex flex-col sm:flex-row  items-center  justify-between pl-6 pr-6 pt-6'>
      <div className='flex gap-4 items-center'>
        <MxLink to={'/'} className='flex items-center justify-between gap-3'>
          <Logo className='rounded-full w-12 h-12' />
        </MxLink>

        <div className='text-sm sm:text-md'>
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
