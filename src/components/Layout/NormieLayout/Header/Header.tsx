import Login from '@/components/Login/normie/Login';
import Logo from '@/components/Logo/Logo';
import { MxLink } from '@/components/MxLink';
import CreatedTokenShakingBox from '@/components/ShakingBoxes/CreatedTokenShakingBox/CreatedTokenShakingBox';
import PoolAndBuySellShakingBox from '@/components/ShakingBoxes/PoolAndBuySellShakingBox/PoolAndBuySellShakingBox';
import SellBuyTokenShakingBox from '@/components/ShakingBoxes/SellBuyTokenShakingBox/SellBuyTokenShakingBox';
import SiteMode from '@/components/SiteMode/SiteMode';
import { nav } from '@/localConstants';
import Link from 'next/link';
import DrawerClient from './DrawerClient';
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
          <div className='flex lg:hidden'>
            <PoolAndBuySellShakingBox />
          </div>
          <div className=' gap-2 items-center lg:flex hidden'>
            <div>
              <SellBuyTokenShakingBox />
            </div>
            <div className=''>
              <CreatedTokenShakingBox />
            </div>
          </div>
        </div>

        <div className='h-full text-sm sm:relative  justify-end sm:bg-transparent flex '>
          {process.env.DEGEN_MODE === 'true' && <SiteMode />}
          <div className='w-full '>
            <div className='relative'>
              <Login />

              {/* <ViewProfileButton /> */}
            </div>
          </div>
        </div>

        <div className='bg-[#08111b] px-6 py-5 flex justify-between fixed bottom-0 left-0 right-0 w-full h-[80px] z-[100] sm:hidden '>
          {nav.map((item) => {
            return (
              <Link
                href={`/?tab=${item}`}
                key={item}
                className='bg-none data-[state=active]:bg-transparent px-2 py-2 data-[state=active]:text-white data-[state=active]:font-bold  text-gray-400'
              >
                {item}
              </Link>
            );
          })}

          <DrawerClient />
        </div>
      </header>
    </div>
  );
};
