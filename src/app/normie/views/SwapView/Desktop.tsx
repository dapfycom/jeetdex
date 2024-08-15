'use client';
import NormieChart from '@/components/ChartCard/NormieChart';
import Chats from '@/components/ChatsCard/Chats';
import HoldersList from '@/components/HoldersList/HoldersList';
import Trades from '@/components/Trades/Trades';
import UserTrades from '@/components/Trades/UserTrades';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppSelector } from '@/hooks';
import useGetDefaultPool from '@/hooks/useGetDefaultPool';
import { cn } from '@/lib/utils';
import { IPoolPair } from '../PoolsView/utils/types';
import SwapCardContainer from './commons/SwapCard/SwapCardContainer';
import TokenSocials from './commons/SwapCard/commons/Socials/TokenSocials';
import { selectIsOpenCharts, selectIsOpenChats } from './lib/swap-slice';
const Desktop = ({ poolPair }: { poolPair: IPoolPair }) => {
  const isOpenCharts = useAppSelector(selectIsOpenCharts);
  const isOpenChats = useAppSelector(selectIsOpenChats);
  const withDefaultPool = useGetDefaultPool(poolPair);

  return (
    <div className='flex flex-col items-center text-center '>
      <div
        className={cn(
          'grid  grid-cols-1 md:grid-cols-[65%_35%] w-full gap-4 h-full',
          !isOpenCharts && 'flex justify-center'
        )}
      >
        <div className='h-full'>
          <div className='h-[450px] hidden sm:block'>
            <NormieChart poolPair={withDefaultPool} />
          </div>

          <div
            className={cn(
              'w-full md:grid hidden mt-4',
              !isOpenCharts && ' justify-center md:hidden'
            )}
          >
            {isOpenChats && (
              <Tabs
                defaultValue='chats'
                className={cn(
                  'w-full rounded-sm bg-[#1C243E] border-none  p-4'
                )}
              >
                <TabsList className='w-full justify-start flex bg-transparent'>
                  <TabsTrigger value='chats'>chats</TabsTrigger>
                  <TabsTrigger value='trades'>trades</TabsTrigger>
                  <TabsTrigger value='my-trades'>my trades</TabsTrigger>
                </TabsList>
                <TabsContent value='chats'>
                  {' '}
                  <Chats poolPair={poolPair?.lpTokenIdentifier} />
                </TabsContent>
                <TabsContent value='trades'>
                  <Trades
                    poolFirstTokenIdentifier={withDefaultPool?.firstTokenId}
                    poolSecondTokenIdentifier={withDefaultPool?.secondTokenId}
                    mode='normie'
                  />
                </TabsContent>
                <TabsContent value='my-trades'>
                  <UserTrades
                    mode='normie'
                    poolFirstTokenIdentifier={withDefaultPool?.firstTokenId}
                    poolSecondTokenIdentifier={withDefaultPool?.secondTokenId}
                  />
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>

        <div className={cn('flex flex-col gap-4', !isOpenCharts && 'flex-row')}>
          <SwapCardContainer poolPair={poolPair} />
          {poolPair?.firstTokenId && (
            <div className='flex flex-col gap-4'>
              <>
                <TokenSocials tokenIdentifier={poolPair?.firstTokenId} />
                <HoldersList tokenIdentifier={poolPair?.firstTokenId} />
              </>
            </div>
          )}
        </div>
      </div>
      <div
        className={cn(
          'grid  grid-cols-1 md:grid-cols-[65%_35%] w-full gap-4 h-full mt-4 md:hidden',
          !isOpenCharts && 'flex justify-center md:grid md:grid-cols-1'
        )}
      >
        {isOpenChats && (
          <Tabs
            defaultValue='chats'
            className={cn('w-full rounded-sm bg-[#1C243E] border-none p-4')}
          >
            <TabsList className='w-full justify-start flex bg-transparent'>
              <TabsTrigger value='chats'>chats</TabsTrigger>
              <TabsTrigger value='trades'>trades</TabsTrigger>
            </TabsList>
            <TabsContent value='chats'>
              {' '}
              <Chats poolPair={withDefaultPool?.lpTokenIdentifier} />
            </TabsContent>
            <TabsContent value='trades'>
              <Trades
                mode='normie'
                poolFirstTokenIdentifier={withDefaultPool?.firstTokenId}
                poolSecondTokenIdentifier={withDefaultPool?.secondTokenId}
              />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default Desktop;
