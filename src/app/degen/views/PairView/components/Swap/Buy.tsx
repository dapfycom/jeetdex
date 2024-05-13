import { jeetStaticData } from '@/localConstants/tokensStaticsData';
import Image from 'next/image';
import PlaceTradeButton from './components/PlaceTradeButton';
import SetSlippageButton from './components/SetSlippageButton';

const Buy = () => {
  return (
    <>
      <div className='flex justify-between w-full gap-2 my-3'>
        <button className='text-xs py-1 px-2 rounded bg-primary text-gray-400 hover:bg-gray-800 hover:text-gray-300'>
          switch to trumpcat
        </button>
        <SetSlippageButton />
      </div>
      <div className='flex flex-col'>
        <div className='flex items-center rounded-md relative bg-[#2e303a]'>
          <input
            className='flex h-10 rounded-md border border-slate-200 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 bg-transparent text-white outline-none w-full pl-3'
            id='amount'
            placeholder='0.0'
            type='number'
          />
          <div className='flex items-center ml-2 absolute right-2'>
            <span className='text-white mr-2 text-sm'>JEET</span>
            <Image
              src={jeetStaticData.assets.svgUrl}
              alt={jeetStaticData.ticker}
              width={28}
              height={28}
              className='w-6 h-6 rounded-full'
            />
          </div>
        </div>
        <div className='flex mt-2 bg-[#2e303a] p-1 rounded-lg'>
          <button className='text-xs py-1 -ml-1 px-2 rounded bg-primary text-gray-400 hover:bg-gray-800 hover:text-gray-300'>
            reset
          </button>
          <button className='text-xs py-1 px-2 ml-1 rounded bg-primary text-gray-400 hover:bg-gray-800 hover:text-gray-300'>
            1000 JEET
          </button>
          <button className='text-xs py-1 px-2 ml-1 rounded bg-primary text-gray-400 hover:bg-gray-800 hover:text-gray-300'>
            5000 JEET
          </button>
          <button className='text-xs py-1 px-2 ml-1 rounded bg-primary text-gray-400 hover:bg-gray-800 hover:text-gray-300'>
            10000 JEET
          </button>
        </div>
      </div>
      <PlaceTradeButton />
    </>
  );
};

export default Buy;
