import HowItWorksModal from '@/components/HowItWorksModal/HowItWorksModal';
import Login from '@/components/Login/normie/Login';

import Logo from '@/components/Logo/Logo';
import { MxLink } from '@/components/MxLink';
import DegenCreatedTokenShakingBox from '@/components/ShakingBoxes/CreatedTokenShakingBox/DegenCreatedTokenShakingBox';
import DegenPoolAndBuySellShakingBox from '@/components/ShakingBoxes/DegenPoolAndBuySellShakingBox/DegenPoolAndBuySellShakingBox';
import SellBuyTokenShakingBox from '@/components/ShakingBoxes/SellBuyTokenShakingBox/SellBuyTokenShakingBox';
import SiteMode from '@/components/SiteMode/SiteMode';

export const Header = () => {
  return (
    <header className='flex flex-row   justify-between pl-1 pr-1 pt-1'>
      <div className='flex gap-4'>
        <MxLink to={'/'} className='flex items-center justify-between gap-3'>
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

        <div className='flex lg:hidden flex-1 justify-center'>
          <DegenPoolAndBuySellShakingBox />
        </div>
        <div className=' gap-2 items-center lg:flex hidden'>
          <div>
            <SellBuyTokenShakingBox mode='degen' />
          </div>
          <div className=''>
            <DegenCreatedTokenShakingBox />
          </div>
        </div>
      </div>

      <div className='h-full text-sm sm:relative  justify-end sm:bg-transparent flex '>
        {process.env.DEGEN_MODE === 'true' && <SiteMode />}
        <div className='w-full '>
          <div className='relative'>
            <Login />
          </div>
        </div>
      </div>
    </header>
  );
};
