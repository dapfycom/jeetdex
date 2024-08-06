'use client';
import { useGetBoundingPair } from '@/app/degen/pair/[address]/hooks';
import useGetElrondToken from '@/hooks/useGetElrondToken';
import BigNumber from 'bignumber.js';
import ChartCard from './ChartCard';

const DegenChart = () => {
  const { coin } = useGetBoundingPair();
  const { elrondToken: firstToken } = useGetElrondToken(coin?.identifier);
  const { elrondToken: secondToken } = useGetElrondToken(coin?.secondTokenId);

  const firstTokenJeetdexPrice = new BigNumber(coin?.secondTokenReserve)
    .dividedBy(coin?.firstTokenReserve)
    .multipliedBy(secondToken?.price)
    .toNumber();

  return (
    <ChartCard
      firstToken={firstToken}
      firstTokenJeetdexPrice={firstTokenJeetdexPrice}
      firstTokenReserve={coin?.firstTokenReserve}
      mode='degen'
    />
  );
};

export default DegenChart;
