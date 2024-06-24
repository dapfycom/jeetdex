import CreatedTokenShakingBox from '@/components/CreatedTokenShakingBox/CreatedTokenShakingBox';
import Login from '@/components/Login/normie/Login';
import Logo from '@/components/Logo/Logo';
import { MxLink } from '@/components/MxLink';
import SellBuyTokenShakingBox from '@/components/SellBuyTokenShakingBox/SellBuyTokenShakingBox';
import SiteMode from '@/components/SiteMode/SiteMode';
import Navbar from './Navbar';
import ViewProfileButton from './ViewProfileButton';

export const Header = () => {
  return (
    <div>
      <header className='relative flex items-start  justify-between  gap-3 p-1 flex-wrap'>
        <div className='flex gap-2 sm:gap-4 items-center'>
          <MxLink to={'/'} className=' items-center justify-between gap-3 flex'>
            <Logo className='rounded-full w-8 h-8 sm:w-9 sm:h-9' />
          </MxLink>
          <div className='flex gap-2 items-center'>
            <Navbar />
            <div className='flex gap-2 items-center'>
              <div className='md:block hidden'>
                <SellBuyTokenShakingBox />
              </div>
              <div className='lg:block hidden'>
                <CreatedTokenShakingBox />
              </div>
            </div>
          </div>
        </div>

        <div className='h-full text-sm sm:relative  justify-end sm:bg-transparent flex items-center'>
          {process.env.DEGEN_MODE === 'true' && <SiteMode />}

          <div className='relative'>
            <Login />

            <ViewProfileButton />
          </div>
        </div>
      </header>
      <div className='md:hidden block w-fit mx-auto sm:mt-0 mt-8'>
        <SellBuyTokenShakingBox />
      </div>
    </div>
  );
};
