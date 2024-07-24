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
  console.log(fromToken);
  console.log(toToken);
  console.log(poolsInfo);

  const poolPair = useMemo(() => {
    return poolsInfo.find((p) => {
      const isFirstFrom =
        p.firstToken.identifier === fromToken &&
        p.secondToken.identifier === toToken;
      const isSecondFrom =
        (fromToken === tokensID.egld
          ? p.secondToken.identifier === tokensID.wegld
          : p.secondToken.identifier === fromToken) &&
        p.firstToken.identifier === toToken;

      return isFirstFrom || isSecondFrom;
    });
  }, [fromToken, poolsInfo, toToken]);
  const { tokensPairs } = useGetSwapbleTokens();

  useEffect(() => {
    if (tokensPairs.length > 0) {
      const tokenPair = tokensPairs.find(
        (t) => t.firstToken === swap || t.secondToken === swap
      );
      if (tokenPair) {
        dispatch(changeToFieldToken(tokenPair.firstToken));
        dispatch(changeFromFieldToken(tokenPair.secondToken));
      } else {
        dispatch(changeToFieldToken(swap || tokensID.jeet));
        dispatch(changeFromFieldToken(tokensID.egld));
      }
    }
  }, [dispatch, swap, tokensPairs]);

  const isMobile = useIsMobile();
  console.log(poolPair);

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
