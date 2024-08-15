'use client';

import NormieChart from '@/components/ChartCard/NormieChart';
import Chats from '@/components/ChatsCard/Chats';
import HoldersList from '@/components/HoldersList/HoldersList';
import DrawerDialogDemo from '@/components/Layout/NormieLayout/Header/Drawer';
import Trades from '@/components/Trades/Trades';
import UserTrades from '@/components/Trades/UserTrades';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppSelector } from '@/hooks';
import useGetDefaultPool from '@/hooks/useGetDefaultPool';
import useUpdateUrlParams from '@/hooks/useUpdateUrlParams';
import { cn } from '@/lib/utils';
import { nav } from '@/localConstants';
import { useEffect, useState } from 'react';
import { IPoolPair } from '../../../PoolsView/utils/types';
import { selectIsOpenChats } from '../../lib/swap-slice';
import SwapCardContainer from '../SwapCard/SwapCardContainer';
import TokenSocials from '../SwapCard/commons/Socials/TokenSocials';

const MobileNavbar = ({ poolPair }: { poolPair: IPoolPair }) => {
  const { currentParams, updateParams } = useUpdateUrlParams(['tab']);
  const isOpenChats = useAppSelector(selectIsOpenChats);
  const [open, setOpen] = useState(false);
  const withDefaultPool = useGetDefaultPool(poolPair);

  useEffect(() => {
    if (!currentParams[0]) {
      updateParams('tab', nav[2].href);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentParams[0]]);
  return (
    <Tabs
      value={currentParams[0]}
      onValueChange={(val) => updateParams('tab', val)}
    >
      <DrawerDialogDemo open={open} setOpen={setOpen} />
      <TabsContent value={nav[0].href} className='w-full'>
        <TokenSocials tokenIdentifier={withDefaultPool?.firstTokenId} />
        <HoldersList tokenIdentifier={withDefaultPool?.firstTokenId} />
      </TabsContent>
      <TabsContent value={nav[1].href} className='w-full'>
        <div
          className='h-full'
          style={{
            height: 'calc(100vh - 300px)'
          }}
        >
          <NormieChart poolPair={poolPair} />
        </div>
      </TabsContent>
      <TabsContent value={nav[2].href} className='w-full'>
        <SwapCardContainer poolPair={poolPair} />

        {isOpenChats && (
          <div className='mt-6'>
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
          </div>
        )}
      </TabsContent>
      <TabsContent value={nav[3].href} className='w-full'>
        <Tabs
          defaultValue='trades'
          className={cn('w-full rounded-sm bg-[#1C243E] border-none  p-4')}
        >
          <TabsList className='w-full justify-start flex bg-transparent'>
            <TabsTrigger value='trades'>trades</TabsTrigger>
            <TabsTrigger value='my-trades'>my trades</TabsTrigger>
          </TabsList>

          <TabsContent value='trades'>
            <Trades
              mode='normie'
              poolFirstTokenIdentifier={withDefaultPool?.firstTokenId}
              poolSecondTokenIdentifier={withDefaultPool?.secondTokenId}
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
      </TabsContent>
    </Tabs>
  );
};

export default MobileNavbar;
