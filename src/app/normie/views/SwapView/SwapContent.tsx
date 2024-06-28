'use client';
import { tokensID } from '@/config';
import { useAppDispatch, useAppSelector } from '@/hooks';
import useIsMobile from '@/hooks/useIsMobile';
import useUpdateUrlParams from '@/hooks/useUpdateUrlParams';
import { selectGlobalData } from '@/redux/dapp/dapp-slice';
import { useEffect, useMemo } from 'react';
import Desktop from './Desktop';
import Mobile from './Mobile';
import { useGetSwapbleTokens } from './lib/hooks';
import {
  changeFromFieldToken,
  changeToFieldToken,
  selectFromFieldSelectedToken,
  selectToFieldSelectedToken
} from './lib/swap-slice';

const SwapContent = () => {
  const fromToken = useAppSelector(selectFromFieldSelectedToken);
  const toToken = useAppSelector(selectToFieldSelectedToken);
  const global = useAppSelector(selectGlobalData);
  const { currentParams } = useUpdateUrlParams(['swap']);
  const dispatch = useAppDispatch();

  const [swap] = currentParams;

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
  const { tokensPairs } = useGetSwapbleTokens();

  useEffect(() => {
    console.log(swap);
    if (tokensPairs.length > 0) {
      const tokenPair = tokensPairs.find(
        (t) => t.firstToken === swap || t.secondToken === swap
      );
      if (tokenPair) {
        dispatch(changeToFieldToken(tokenPair.firstToken));
        dispatch(changeFromFieldToken(tokenPair.secondToken));
      } else {
        dispatch(changeToFieldToken(swap || tokensID.bsk));
        dispatch(changeFromFieldToken(tokensID.jeet));
      }
    }
  }, [dispatch, swap, tokensPairs]);

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
