'use client';

import { tokensID } from '@/config';
import useGetElrondToken from '@/hooks/useGetElrondToken';
import { jeetStaticData } from '@/localConstants/tokensStaticsData';
import Image from 'next/image';

const Swap = () => {
  const { elrondToken } = useGetElrondToken(tokensID.jeet);
  console.log(elrondToken);

  return (
    <div className='grid gap-4 h-auto'>
      <div className='bg-[#2e303a] p-4 rounded-lg border border-none text-gray-400 grid gap-4'>
        <div className='grid grid-cols-2 gap-2 mb-4'>
          <button className='p-2 text-center rounded bg-green-400 text-primary'>
            Buy
          </button>
          <button className='p-2 text-center rounded bg-gray-800 text-grey-600'>
            Sell
          </button>
        </div>
        <div className='flex justify-between w-full gap-2'>
          <button className='text-xs py-1 px-2 rounded bg-primary text-gray-400 hover:bg-gray-800 hover:text-gray-300'>
            switch to trumpcat
          </button>
          <button
            className='text-xs py-1 px-2 rounded text-gray-400 hover:bg-gray-800 bg-primary'
            type='button'
            aria-haspopup='dialog'
            aria-expanded='false'
            aria-controls='radix-:r58:'
            data-state='closed'
          >
            Set max slippage
          </button>
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
              <span className='text-white mr-2'>JEET</span>
              <Image
                src={jeetStaticData.assets.svgUrl}
                alt={jeetStaticData.ticker}
                width={32}
                height={32}
                className='w-8 h-8 rounded-full'
              />
            </div>
          </div>
          <div className='flex mt-2 bg-[#2e303a] p-1 rounded-lg'>
            <button className='text-xs py-1 -ml-1 px-2 rounded bg-primary text-gray-400 hover:bg-gray-800 hover:text-gray-300'>
              reset
            </button>
            <button className='text-xs py-1 px-2 ml-1 rounded bg-primary text-gray-400 hover:bg-gray-800 hover:text-gray-300'>
              1 SOL
            </button>
            <button className='text-xs py-1 px-2 ml-1 rounded bg-primary text-gray-400 hover:bg-gray-800 hover:text-gray-300'>
              5 SOL
            </button>
            <button className='text-xs py-1 px-2 ml-1 rounded bg-primary text-gray-400 hover:bg-gray-800 hover:text-gray-300'>
              10 SOL
            </button>
          </div>
        </div>
        <button className='inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 h-10 px-4 bg-green-400 text-primary w-full py-3 rounded-md hover:bg-green-200'>
          place trade
        </button>
      </div>
    </div>
  );
};

export default Swap;
