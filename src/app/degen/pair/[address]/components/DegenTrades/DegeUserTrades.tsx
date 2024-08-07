'use client';
import UserTrades from '@/components/Trades/UserTrades';
import { tokensID } from '@/config';
import useGetElrondToken from '@/hooks/useGetElrondToken';
import { useGetBoundingPair } from '../../hooks';

const DegeUserTrades = () => {
  const { coin } = useGetBoundingPair();
  const { elrondToken: poolFirstToken } = useGetElrondToken(coin?.firstTokenId);
  const { elrondToken: poolSecondToken } = useGetElrondToken(tokensID.wegld);

  if (!coin || !poolFirstToken || !poolSecondToken) return null;
  return (
    <UserTrades
      poolAddress={coin.address}
      poolFirstToken={poolFirstToken}
      poolSecondToken={poolSecondToken}
      mode='degen'
    />
  );
};

export default DegeUserTrades;
