'use client';
import { useAppSelector } from '@/hooks';
import useIsMobile from '@/hooks/useIsMobile';
import useUpdateUrlParams from '@/hooks/useUpdateUrlParams';
import { selectGlobalData } from '@/redux/dapp/dapp-slice';
import { useEffect, useMemo } from 'react';
import Desktop from './Desktop';
import Mobile from './Mobile';
import {
  selectFromFieldSelectedToken,
  selectToFieldSelectedToken
} from './lib/swap-slice';

const SwapContent = () => {
  const fromToken = useAppSelector(selectFromFieldSelectedToken);
  const toToken = useAppSelector(selectToFieldSelectedToken);
  const global = useAppSelector(selectGlobalData);
  const { updateParams } = useUpdateUrlParams(['swap']);

  const poolsInfo = global.pools;

  const poolPair = useMemo(() => {
    return poolsInfo.find(
      (p) =>
        (p.firstToken.identifier === fromToken &&
          p.secondToken.identifier === toToken) ||
        (p.secondToken.identifier === fromToken &&
          p.firstToken.identifier === toToken)
    );
  }, [fromToken, poolsInfo, toToken]);

  useEffect(() => {
    if (poolPair?.firstTokenId) {
      updateParams('swap', poolPair.firstTokenId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poolPair?.firstTokenId]);

  const isMobile = useIsMobile();
  return (
    <>
      {!isMobile ? (
        <Desktop poolPair={poolPair} />
      ) : (
        <Mobile poolPair={poolPair} />
      )}
    </>
  );
};

export default SwapContent;
