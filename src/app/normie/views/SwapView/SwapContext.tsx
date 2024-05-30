'use client';
import useDisclosure from '@/hooks/useDisclosure';
import React, { PropsWithChildren } from 'react';

const SwapCtx = React.createContext({
  isOPenChats: true,
  onToggleChats: () => {},
  isOpenCharts: true,
  OnToggleCharts: () => {}
});

const SwapContext = ({ children }: PropsWithChildren) => {
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
