'use client';
import UserTrades from '@/components/Trades/UserTrades';
import { tokensID } from '@/config';
import { useGetBoundingPair } from '../../hooks';

const DegeUserTrades = () => {
  const { coin } = useGetBoundingPair();

  if (!coin) return null;
  return (
    <UserTrades
      poolFirstTokenIdentifier={coin?.firstTokenId}
      poolSecondTokenIdentifier={tokensID.wegld}
      mode='degen'
    />
  );
};

export default DegeUserTrades;
