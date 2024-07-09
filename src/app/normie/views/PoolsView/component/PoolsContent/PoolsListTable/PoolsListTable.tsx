'use client';
import useDisclosure from '@/hooks/useDisclosure';
import useGetUserTokens from '@/hooks/useGetUserTokens';
import { IElrondAccountToken } from '@/types/scTypes';
import { errorToast } from '@/utils/toast';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useListPools, useSearchPool } from '../../../utils/hooks';
import { IPoolPair } from '../../../utils/types';
import PoolItem from './PoolItemTable';
const PositionModal = dynamic(
  () => import('../../PositionModal/PositionModal'),
  {
    ssr: false
  }
);

interface IProps {
  pools: IPoolPair[];
}

const PoolsList = ({ pools }: IProps) => {
  const orderedPools = useListPools(pools);
  const filteredPools = useSearchPool(orderedPools);
  const { userTokens } = useGetUserTokens();
  const { isOpen, onToggle } = useDisclosure();
  const [selectedPool, setSelectedPool] = useState<IPoolPair>(null);
  const [selectedLiquidity, setSelectedLiquidity] =
    useState<IElrondAccountToken>(null);

  const handlePositionModal = (
    pool: IPoolPair,
    liquidity: IElrondAccountToken
  ) => {
    console.log(pool, liquidity);

    if (liquidity) {
      setSelectedPool(pool);
      setSelectedLiquidity(liquidity);
      onToggle();
    } else {
      errorToast("You don't have any liquidity in this pool");
    }
  };

  return (
    <>
      <div className='flex flex-col gap-6'>
        {filteredPools.map((pool) => {
          const lpToken = userTokens.find(
            (t) => t.identifier === pool.lpTokenIdentifier
          );

          return (
            <PoolItem
              key={pool.address}
              pool={pool}
              userLp={lpToken}
              onClickLp={() => handlePositionModal(pool, lpToken)}
            />
          );
        })}
      </div>
      {isOpen && selectedLiquidity && (
        <PositionModal
          isOpen={isOpen}
          onToggle={onToggle}
          pool={selectedPool}
          liquidity={selectedLiquidity}
        />
      )}
    </>
  );
};

export default PoolsList;
