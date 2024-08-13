'use client';
import Trades from '@/components/Trades/Trades';
import { tokensID } from '@/config';
import { useGetBoundingPair } from '../../hooks';

const DegenTrades = () => {
  const { coin } = useGetBoundingPair();

  if (!coin) return null;
  return (
    <div>
      <Trades
        poolFirstTokenIdentifier={coin?.firstTokenId}
        poolSecondTokenIdentifier={tokensID.wegld}
        mode='degen'
      />
    </div>
  );
};

export default DegenTrades;
