'use client';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useListPools } from '../../../utils/hooks';
import { IPoolPair } from '../../../utils/types';
import PoolItem from './PoolItemTable';

interface IProps {
  pools: IPoolPair[];
}

const PoolsList = ({ pools }: IProps) => {
  const orderedPools = useListPools(pools);
  return (
    <Table className='bg-[#1015299d] '>
      <TableHeader className=''>
        <TableRow className=' rounded-sm'>
          <TableHead className='w-[70px] py-5 rounded-ss-sm'></TableHead>

          <TableHead className='w-[100px]  ] py-5 '>Pool</TableHead>
          <TableHead className='] py-5 '>Reserve 1</TableHead>
          <TableHead className='] py-5 '>Reserve 2</TableHead>

          <TableHead className='] py-5 rounded-se-sm'></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orderedPools.map((pool) => (
          <PoolItem key={pool.address} pool={pool} />
        ))}
      </TableBody>
    </Table>
  );
};

export default PoolsList;
