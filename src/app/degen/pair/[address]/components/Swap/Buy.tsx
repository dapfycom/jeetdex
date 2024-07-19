'use client';
import { TokenImageSRC } from '@/components/TokenImage/TokenImage';
import { formatTokenI } from '@/utils/mx-utils';
import PlaceTradeButton from './components/PlaceTradeButton';
import SetSlippageButton from './components/SetSlippageButton';
import useSwap from './useSwap';

const Buy = () => {
  const { onSubmit, token, form } = useSwap('buy');

  if (!token) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className='flex justify-between w-full gap-2 my-3'>
        <button className='text-xs py-1 px-2 rounded bg-[#213040] text-gray-200 hover:bg-gray-800 hover:text-gray-300'>
          switch to trumpcat
        </button>
        <SetSlippageButton />
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col'>
        <div className='flex items-center rounded-md relative bg-[#2e303a]'>
          <input
            className='flex h-10 rounded-md border border-slate-200 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 bg-transparent text-white outline-none w-full pl-3'
            id='amount'
            placeholder='0.0'
            {...form.register('amount')}
          />
          <div className='flex items-center ml-2 absolute right-2'>
            <span className='text-white mr-2 text-sm'>
              {formatTokenI(token.ticker)}
            </span>
            <TokenImageSRC
              src={token.assets.svgUrl}
              alt={token.ticker}
              identifier={token.identifier}
              size={28}
              className='w-6 h-6 rounded-full'
            />
          </div>
        </div>
        <div className='flex mt-2 bg-[#2e303a] p-1 rounded-lg'>
          <button
            className='text-xs py-1 -ml-1 px-2 rounded bg-[#213040] text-gray-200 hover:bg-gray-800 hover:text-gray-300'
            type='button'
          >
            reset
          </button>
          <button
            className='text-xs py-1 px-2 ml-1 rounded bg-[#213040] text-gray-200 hover:bg-gray-800 hover:text-gray-300'
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.setValue('amount', '0.5');
            }}
          >
            0.5 {formatTokenI(token.ticker)}
          </button>
          <button
            className='text-xs py-1 px-2 ml-1 rounded bg-[#213040] text-gray-200 hover:bg-gray-800 hover:text-gray-300'
            onClick={() => form.setValue('amount', '1')}
          >
            1 {formatTokenI(token.ticker)}
          </button>
          <button
            className='text-xs py-1 px-2 ml-1 rounded bg-[#213040] text-gray-200 hover:bg-gray-800 hover:text-gray-300'
            onClick={() => form.setValue('amount', '2')}
          >
            2 {formatTokenI(token.ticker)}
          </button>
        </div>
        <PlaceTradeButton />
      </form>
    </>
  );
};

export default Buy;
