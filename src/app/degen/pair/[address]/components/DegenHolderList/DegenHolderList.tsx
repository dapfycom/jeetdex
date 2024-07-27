'use client';
import HoldersList from '@/components/HoldersList/HoldersList';
import { useGetBoundingPair } from '../../hooks';

const DegenHolderList = () => {
  const { coin } = useGetBoundingPair();

  return (
    <HoldersList tokenIdentifier={coin?.firstTokenId} degenId={coin?.degenId} />
  );
};

export default DegenHolderList;
