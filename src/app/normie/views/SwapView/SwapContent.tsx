'use client';
import ChartCard from '@/components/ChartCard/ChartCard';
import Chats from '@/components/ChatsCard/Chats';
import { useAppSelector } from '@/hooks';
import { cn } from '@/lib/utils';
import { selectGlobalData } from '@/redux/dapp/dapp-slice';
import { useSwapContext } from './SwapContext';
import SwapCardContainer from './commons/SwapCard/SwapCardContainer';
import {
  selectFromFieldSelectedToken,
  selectNormalDirection,
  selectToFieldSelectedToken
} from './lib/swap-slice';
const SwapContent = () => {
  const swapCtx = useSwapContext();
  const fromToken = useAppSelector(selectFromFieldSelectedToken);
  const toToken = useAppSelector(selectToFieldSelectedToken);
  const direction = useAppSelector(selectNormalDirection);
  const global = useAppSelector(selectGlobalData);

  const poolsInfo = global.pools;

  const poolPair = poolsInfo.find((p) =>
    direction
      ? p.firstToken.identifier === fromToken &&
        p.secondToken.identifier === toToken
      : p.secondToken.identifier === fromToken &&
        p.firstToken.identifier === toToken
  );

  return (
    <div className='flex flex-col items-center text-center '>
      <div
        className={cn(
          'grid  grid-cols-1 md:grid-cols-[65%_35%] w-full gap-4 h-full',
          !swapCtx.isOpenCharts && 'flex justify-center'
        )}
      >
        <ChartCard poolPair={poolPair} />
        <SwapCardContainer />
      </div>
      <div
        className={cn(
          'grid  grid-cols-1 md:grid-cols-[65%_35%] w-full gap-4 h-full mt-20',
          !swapCtx.isOpenCharts && 'flex justify-center'
        )}
      >
        <Chats
          poolPair={poolPair?.lpTokenIdentifier}
          show={swapCtx.isOPenChats}
        />
      </div>
    </div>
  );
};

export default SwapContent;
