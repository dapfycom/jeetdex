'use client';
import Trades from '@/components/Trades/Trades';
import { tokensID } from '@/config';
import useGetElrondToken from '@/hooks/useGetElrondToken';
import { useGetBoundingPair } from '../../hooks';

const DegenTrades = () => {
  const { coin } = useGetBoundingPair();
  const { elrondToken: poolFirstToken } = useGetElrondToken(coin?.firstTokenId);
  const { elrondToken: poolSecondToken } = useGetElrondToken(tokensID.wegld);

  if (!coin || !poolFirstToken || !poolSecondToken) return null;
  return (
    <div>
      <Trades
        poolAddress={coin.address}
        poolFirstToken={poolFirstToken}
        poolSecondToken={poolSecondToken}
        mode='degen'
      />
    </div>
  );
};

export default DegenTrades;
