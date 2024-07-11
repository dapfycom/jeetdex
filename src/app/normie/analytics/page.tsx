'use client';

import useGetStatics from '@/components/Statics/useGetStatics';
import { Skeleton } from '@/components/ui/skeleton';
import { tokensID } from '@/config';
import { useAppSelector } from '@/hooks';
import useGetElrondToken from '@/hooks/useGetElrondToken';
import useGetMultipleElrondTokens from '@/hooks/useGetMultipleElrondTokens';
import { selectGlobalData } from '@/redux/dapp/dapp-slice';
import { formatBalanceDollar, formatNumber } from '@/utils/mx-utils';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

export default function Analitics() {
  const { data, isLoading: isLoadingStatics } = useGetStatics();

  const { elrondToken, isLoading: isLoadingjeet } = useGetElrondToken(
    tokensID.jeet
  );

  const { tokens, isLoading: isLoadingTokens } = useGetMultipleElrondTokens(
    data
      ? data.topGainers
          .map((g) => g.token)
          .concat(data.topLosers.map((l) => l.token))
      : []
  );

  const globalData = useAppSelector(selectGlobalData);
  const pools = globalData.pools;

  const tvl = useMemo(() => {
    return pools.reduce((acc, pool) => {
      const poolValue = new BigNumber(
        formatBalanceDollar(
          {
            balance: pool.firstTokenReserve,
            decimals: pool.firstToken.decimals
          },
          pool.firstTokenJeetdexPrice
        )
      ).plus(
        new BigNumber(
          formatBalanceDollar(
            {
              balance: pool.secondTokenReserve,
              decimals: pool.secondToken.decimals
            },
            pool.secondToken.price
          )
        )
      );
      return acc.plus(poolValue);
    }, new BigNumber(0));
  }, [pools]);

  const topGainers: {
    name: string;
    symbol: string;
    price: number;
    change: number;
  }[] = data?.topGainers.map((gainer) => {
    const elrondToken = tokens.find((t) => t.identifier === gainer.token);
    return {
      name: elrondToken?.name,
      symbol: elrondToken?.ticker,
      price: gainer.currentPrice,
      change: gainer.percentageChange
    };
  });

  const topLosers: {
    name: string;
    symbol: string;
    price: number;
    change: number;
  }[] = data?.topLosers.map((loser) => {
    const elrondToken = tokens.find((t) => t.identifier === loser.token);
    return {
      name: elrondToken?.name,
      symbol: elrondToken?.ticker,
      price: loser.currentPrice,
      change: loser.percentageChange
    };
  });

  const isLoading = isLoadingjeet || isLoadingStatics || isLoadingTokens;
  return (
    <div className='container mx-auto px-4 py-8 md:px-6 md:py-12'>
      <h1 className='text-3xl font-bold mb-8'>Jeetdex Analytics</h1>

      <section className='mb-12'>
        <h2 className='text-2xl font-bold mb-4'>🔒Total Value Locked (TVL) </h2>
        {!tvl ? (
          <Skeleton className='w-[160px] h-[80px]' />
        ) : (
          <div className='bg-background rounded-lg shadow-lg p-6 w-fit'>
            <div className='flex '>
              <div className='text-center'>
                <div className='text-2xl font-bold'>
                  $ {formatNumber(tvl.toNumber())}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      <section className='mb-12'>
        <h2 className='text-2xl font-bold mb-4'>Daily Volume</h2>
        {isLoading ? (
          <Skeleton className='w-[160px] h-[80px]' />
        ) : (
          <div className='bg-background rounded-lg shadow-lg p-6 w-fit'>
            <div className='flex '>
              <div className='text-center'>
                <div className='text-2xl font-bold'>
                  ${' '}
                  {formatBalanceDollar(
                    {
                      balance: data.volume,
                      decimals: 0
                    },
                    elrondToken.price,
                    true
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className='mb-12'>
        <h2 className='text-2xl font-bold mb-4'>Top Gainers</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
          {isLoading ? (
            <>
              {[1, 2, 3, 4, 5, 6].map((v) => {
                return <Skeleton key={v} className='w-full h-[80px]' />;
              })}
            </>
          ) : (
            <>
              {topGainers.map((coin) => (
                <div
                  key={coin.symbol}
                  className='bg-background rounded-lg shadow-lg p-4'
                >
                  <div className='flex items-center justify-between mb-2'>
                    <div className='flex items-center gap-2'>
                      <div className='bg-muted rounded-full w-8 h-8 flex items-center justify-center'>
                        <span className='text-muted-foreground font-bold'>
                          {coin.symbol}
                        </span>
                      </div>
                      <span className='font-medium'>{coin.name}</span>
                    </div>
                    <span
                      className={`font-medium ${
                        coin.change > 0 ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {coin.change.toFixed(2)}%
                    </span>
                  </div>
                  <div className='text-2xl font-bold'>
                    ${coin.price.toFixed(2)}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </section>
      <section className='mb-12'>
        <h2 className='text-2xl font-bold mb-4'>Top Losers</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
          {isLoading ? (
            <>
              {[1, 2, 3, 4, 5, 6].map((v) => {
                return <Skeleton key={v} className='w-full h-[80px]' />;
              })}
            </>
          ) : (
            <>
              {topLosers.map((coin) => (
                <div
                  key={coin.symbol}
                  className='bg-background rounded-lg shadow-lg p-4'
                >
                  <div className='flex items-center justify-between mb-2'>
                    <div className='flex items-center gap-2'>
                      <div className='bg-muted rounded-full w-8 h-8 flex items-center justify-center'>
                        <span className='text-muted-foreground font-bold'>
                          {coin.symbol}
                        </span>
                      </div>
                      <span className='font-medium'>{coin.name}</span>
                    </div>
                    <span
                      className={`font-medium ${
                        coin.change > 0 ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {coin.change.toFixed(2)}%
                    </span>
                  </div>
                  <div className='text-2xl font-bold'>
                    ${coin.price.toFixed(2)}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
