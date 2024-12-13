import HowItWorksModal from '@/components/HowItWorksModal/HowItWorksModal';
import Login from '@/components/Login/normie/Login';

import Logo from '@/components/Logo/Logo';
import { MxLink } from '@/components/MxLink';
import DegenCreatedTokenShakingBox from '@/components/ShakingBoxes/CreatedTokenShakingBox/DegenCreatedTokenShakingBox';
import DegenPoolAndBuySellShakingBox from '@/components/ShakingBoxes/DegenPoolAndBuySellShakingBox/DegenPoolAndBuySellShakingBox';
import SellBuyTokenShakingBox from '@/components/ShakingBoxes/SellBuyTokenShakingBox/SellBuyTokenShakingBox';
import SiteMode from '@/components/SiteMode/SiteMode';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className='flex sm:flex-row   justify-between pl-1 pr-1 pt-1 flex-col items-center gap-4'>
      <div className='flex gap-2 sm:gap-4 w-full items-center'>
        <div className=' gap-2 items-center flex justify-between '>
          <div className=' gap-4 flex '>
            <MxLink
              to={'/'}
              className=' items-center justify-between gap-3 hidden sm:flex w-12 h-12'
            >
              <Logo className='rounded-full w-12 h-12' />
            </MxLink>
            <div>
              <div className='flex gap-2 items-center'>
                <a
                  href='https://x.com/jeetdexcom'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:font-bold text-sm sm:text-base'
                >
                  [twitter]
                </a>

                <a
                  href='https://t.me/jeetdex'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:font-bold text-sm sm:text-base'
                >
                  [telegram]
                </a>
              </div>
              <div className='flex gap-2 items-center'>
                <HowItWorksModal />
              </div>
            </div>
          </div>
        </div>

        <div className=' gap-2  lg:flex hidden flex-1'>
          <div>
            <SellBuyTokenShakingBox mode='degen' />
          </div>
          <div className=''>
            <DegenCreatedTokenShakingBox />
          </div>
        </div>
        <div>
          <div className='h-full w-full text-sm sm:relative  justify-end sm:bg-transparent flex'>
            {process.env.DEGEN_MODE === 'true' && <SiteMode />}
            <div className=''>
              <div className='relative'>
                <Login />
              </div>
            </div>
          </div>
          <div className='flex gap-2 w-full justify-end mt-1 pr-3'>
            <Link href={'/degen/dust'} className='hover:font-bold'>
              [convert dust]
            </Link>
          </div>
        </div>
      </div>

      <div className='flex lg:hidden flex-1 justify-center'>
        <DegenPoolAndBuySellShakingBox />
      </div>
    </header>
  );
};
