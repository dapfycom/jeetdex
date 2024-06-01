'use client';
import useDisclosure from '@/hooks/useDisclosure';
import React, { PropsWithChildren } from 'react';
import { IPoolPair } from '../PoolsView/utils/types';

const SwapCtx = React.createContext<{
  isOPenChats: boolean;
  onToggleChats: () => void;
  isOpenCharts: boolean;
  OnToggleCharts: () => void;
}>({
  isOPenChats: true,
  onToggleChats: () => {},
  isOpenCharts: true,
  OnToggleCharts: () => {}
});

const SwapContext = ({
  children
}: PropsWithChildren<{ poolsInfo: IPoolPair[] }>) => {
  const { isOpen: isOPenChats, onToggle: onToggleChats } = useDisclosure(true);
  const { isOpen: isOpenCharts, onToggle } = useDisclosure(true);

  const OnToggleCharts = () => {
    console.log('onToggleCharts');

    onToggle();
  };

  return (
    <SwapCtx.Provider
      value={{
        isOPenChats,
        onToggleChats,
        isOpenCharts,
        OnToggleCharts
      }}
    >
      {children}
    </SwapCtx.Provider>
  );
};

export default SwapContext;

export const useSwapContext = () => React.useContext(SwapCtx);