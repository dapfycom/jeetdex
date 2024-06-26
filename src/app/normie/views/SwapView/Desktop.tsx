'use client';
import ChartCard from '@/components/ChartCard/ChartCard';
import Chats from '@/components/ChatsCard/Chats';
import HoldersList from '@/components/HoldersList/HoldersList';
import Trades from '@/components/Trades/Trades';
import UserTrades from '@/components/Trades/UserTrades';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppSelector } from '@/hooks';
import { cn } from '@/lib/utils';
import SwapCardContainer from './commons/SwapCard/SwapCardContainer';
import TokenSocials from './commons/SwapCard/commons/Socials/TokenSocials';
import { selectIsOpenCharts, selectIsOpenChats } from './lib/swap-slice';
const Desktop = ({ poolPair }) => {
  const isOpenCharts = useAppSelector(selectIsOpenCharts);
  const isOpenChats = useAppSelector(selectIsOpenChats);

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
            <ChartCard poolPair={poolPair} />
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
                  <Trades poolPair={poolPair} />
                </TabsContent>
                <TabsContent value='my-trades'>
                  <UserTrades poolPair={poolPair} />
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>

        <div className={cn('flex flex-col gap-4', !isOpenCharts && 'flex-row')}>
          <SwapCardContainer />
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
              <Chats poolPair={poolPair?.lpTokenIdentifier} />
            </TabsContent>
            <TabsContent value='trades'>
              <Trades poolPair={poolPair} />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default Desktop;
