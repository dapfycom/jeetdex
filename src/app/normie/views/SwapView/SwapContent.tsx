'use client';
import ChartCard from '@/components/ChartCard/ChartCard';
import Chats from '@/components/ChatsCard/Chats';
import Trades from '@/components/Trades/Trades';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppSelector } from '@/hooks';
import useUpdateUrlParams from '@/hooks/useUpdateUrlParams';
import { cn } from '@/lib/utils';
import { selectGlobalData } from '@/redux/dapp/dapp-slice';
import { useEffect } from 'react';
import { useSwapContext } from './SwapContext';
import SwapCardContainer from './commons/SwapCard/SwapCardContainer';
import TokenSocials from './commons/SwapCard/commons/Socials/TokenSocials';
import {
  selectFromFieldSelectedToken,
  selectToFieldSelectedToken
} from './lib/swap-slice';

const SwapContent = () => {
  const swapCtx = useSwapContext();
  const fromToken = useAppSelector(selectFromFieldSelectedToken);
  const toToken = useAppSelector(selectToFieldSelectedToken);
  const global = useAppSelector(selectGlobalData);
  const { updateParams } = useUpdateUrlParams(['swap']);

  const poolsInfo = global.pools;

  const poolPair = poolsInfo.find(
    (p) =>
      (p.firstToken.identifier === fromToken &&
        p.secondToken.identifier === toToken) ||
      (p.secondToken.identifier === fromToken &&
        p.firstToken.identifier === toToken)
  );

  useEffect(() => {
    if (poolPair?.firstTokenId) {
      updateParams('swap', poolPair.firstTokenId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poolPair?.firstTokenId]);

  return (
    <div className='flex flex-col items-center text-center '>
      <div
        className={cn(
          'grid  grid-cols-1 md:grid-cols-[65%_35%] w-full gap-4 h-full',
          !swapCtx.isOpenCharts && 'flex justify-center'
        )}
      >
        <div>
          <div className='h-full max-h-[450px]'>
            <ChartCard poolPair={poolPair} />
          </div>
          <div
            className={cn(
              'w-full md:grid hidden mt-4',
              !swapCtx.isOpenCharts && 'flex justify-center'
            )}
          >
            <Tabs
              defaultValue='chats'
              className={cn(
                'w-full rounded-sm bg-[#1C243E] border-none shadow-[0px_8px_24px_rgba(79,_83,_243,_0.12)] p-4',
                !swapCtx.isOPenChats && 'hidden'
              )}
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
                <Trades pool={poolPair} />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <SwapCardContainer />
          <TokenSocials tokenIdentifier={poolPair?.firstTokenId} />
        </div>
      </div>
      <div
        className={cn(
          'grid  grid-cols-1 md:grid-cols-[65%_35%] w-full gap-4 h-full mt-4 md:hidden',
          !swapCtx.isOpenCharts && 'flex justify-center'
        )}
      >
        <Tabs
          defaultValue='chats'
          className={cn(
            'w-full rounded-sm bg-[#1C243E] border-none shadow-[0px_8px_24px_rgba(79,_83,_243,_0.12)] p-4',
            !swapCtx.isOPenChats && 'hidden'
          )}
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
            <Trades pool={poolPair} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SwapContent;
