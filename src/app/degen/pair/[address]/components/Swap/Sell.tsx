'use client';
import { TokenImageSRC } from '@/components/TokenImage/TokenImage';
import { Input } from '@/components/ui/input';
import useGetAccountToken from '@/hooks/useGetAccountToken';
import { formatBalance, formatTokenI } from '@/utils/mx-utils';
import BigNumber from 'bignumber.js';
import { useGetBoundingPair } from '../../hooks';
import PlaceTradeButton from './components/PlaceTradeButton';
import SetSlippageButton from './components/SetSlippageButton';
import useSwap from './useSwap';

const Sell = () => {
  const { onSubmit, token, form, reset } = useSwap('sell');
  const { coin } = useGetBoundingPair();
  const { accountToken, isLoading } = useGetAccountToken(coin.firstTokenId);
  if (!token) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='flex justify-end w-full gap-2 mt-8 mb-3'>
        {/* <button className='text-xs py-1 px-2 rounded bg-primary text-gray-800 hover:bg-gray-800 hover:text-gray-300'>
          switch to trumpcat
        </button> */}
        <SetSlippageButton />
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col'>
        <div className='flex items-center rounded-md relative bg-[#2e303a]'>
          <Input
            className='flex h-10 rounded-md border border-slate-200  w-full pl-3'
            id='amount'
            placeholder='0.0'
            {...form.register('amount')}
          />

          <div className='flex items-center ml-2 absolute right-2'>
            <span className='text-white mr-2 text-sm'>
              {formatTokenI(token.ticker)}
            </span>
            <TokenImageSRC
              src={token.assets?.svgUrl}
              alt={token.ticker}
              identifier={coin.degenId}
              size={28}
              className='w-6 h-6 rounded-full'
            />
          </div>
        </div>

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className='flex mt-2 bg-[#2e303a] p-1 rounded-lg'>
            <button
              className='text-xs py-1 -ml-1 px-2 rounded bg-[#151e29] text-gray-400 hover:bg-gray-800 hover:text-gray-300 '
              onClick={() => reset()}
            >
              reset
            </button>

            <button
              className='text-xs py-1 px-2 ml-1 rounded bg-[#151e29] text-gray-400 hover:bg-gray-800 hover:text-gray-300'
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.setValue(
                  'amount',
                  new BigNumber(formatBalance(accountToken, true))
                    .multipliedBy(0.25)
                    .toNumber()
                );
              }}
            >
              25%
            </button>
            <button
              className='text-xs py-1 px-2 ml-1 rounded bg-[#151e29] text-gray-400 hover:bg-gray-800 hover:text-gray-300'
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.setValue(
                  'amount',
                  new BigNumber(formatBalance(accountToken, true))
                    .multipliedBy(0.5)
                    .toNumber()
                );
              }}
            >
              50%
            </button>
            <button
              className='text-xs py-1 px-2 ml-1 rounded bg-[#151e29] text-gray-400 hover:bg-gray-800 hover:text-gray-300'
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.setValue(
                  'amount',
                  new BigNumber(formatBalance(accountToken, true))
                    .multipliedBy(0.75)
                    .toNumber()
                );
              }}
            >
              75%
            </button>
            <button
              className='text-xs py-1 px-2 ml-1 rounded bg-[#151e29] text-gray-400 hover:bg-gray-800 hover:text-gray-300'
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.setValue(
                  'amount',
                  new BigNumber(formatBalance(accountToken, true))
                    .multipliedBy(1)
                    .toNumber()
                );
              }}
            >
              100%
            </button>
          </div>
        )}
        <PlaceTradeButton />
      </form>
    </>
  );
};

export default Sell;