import CreatedTokenShakingBox from '@/components/CreatedTokenShakingBox/CreatedTokenShakingBox';
import Login from '@/components/Login/normie/Login';
import Logo from '@/components/Logo/Logo';
import { MxLink } from '@/components/MxLink';
import SellBuyTokenShakingBox from '@/components/SellBuyTokenShakingBox/SellBuyTokenShakingBox';
import SiteMode from '@/components/SiteMode/SiteMode';
import { DrawerDialogDemo } from './Drawer';
import Navbar from './Navbar';

export const Header = () => {
  return (
    <div>
      <header className='relative flex items-start  justify-between  gap-3 p-1 flex-wrap'>
        <div className='flex gap-2 sm:gap-4 items-center'>
          <MxLink
            to={'/'}
            className=' items-center justify-between gap-3 lg:flex hidden'
          >
            <Logo className='rounded-full w-8 h-8 sm:w-9 sm:h-9' />
          </MxLink>
          <div className=' gap-2 items-center lg:flex hidden'>
            <Navbar />
          </div>
          <div className='flex gap-2 items-center'>
            <div>
              <SellBuyTokenShakingBox />
            </div>
            <div className='lg:block hidden'>
              <CreatedTokenShakingBox />
            </div>
          </div>
        </div>

        <div className='h-full text-sm sm:relative  justify-end sm:bg-transparent flex items-center'>
          {process.env.DEGEN_MODE === 'true' && <SiteMode />}
          <div className='w-full '>
            <div className='relative'>
              <Login />

              {/* <ViewProfileButton /> */}
              <DrawerDialogDemo />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
