'use client';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import useDisclosure from '@/hooks/useDisclosure';
import useGetUserTokens from '@/hooks/useGetUserTokens';
import { IElrondAccountToken } from '@/types/scTypes';
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

  console.log(userTokens);

  const lpTokens = userTokens.filter((token) =>
    pools.map((p) => p.lpTokenIdentifier).includes(token.identifier)
  );
  console.log(lpTokens);

  const handlePositionModal = (
    pool: IPoolPair,
    liquidity: IElrondAccountToken
  ) => {
    console.log(pool, liquidity);

    setSelectedPool(pool);
    setSelectedLiquidity(liquidity);
    onToggle();
  };

  return (
    <>
      <Table className='bg-[#1015299d] '>
        <TableHeader className=''>
          <TableRow className=' rounded-sm'>
            <TableHead className='w-[70px] py-5 rounded-ss-sm'></TableHead>

            <TableHead className='w-[100px]  ] py-5 '>Pool</TableHead>
            <TableHead className='whitespace-nowrap py-5 '>Reserve 1</TableHead>
            <TableHead className='whitespace-nowrap py-5 '>Reserve 2</TableHead>
            <TableHead className='whitespace-nowrap py-5 '>My LP</TableHead>

            <TableHead className='whitespace-nowrap py-5 rounded-se-sm'></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
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
        </TableBody>
      </Table>
      {isOpen && (
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
