import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { IPoolPair } from '../../../utils/types';
import PoolItem from './PoolItemTable';

interface IProps {
  pools: IPoolPair[];
}

const PoolsList = ({ pools }: IProps) => {
  return (
    <Table>
      <TableHeader className=''>
        <TableRow className=' rounded-2xl'>
          <TableHead className='w-[70px] bg-[#1015299d] py-5 rounded-ss-2xl'></TableHead>

          <TableHead className='w-[100px]  bg-[#1015299d] py-5 '>
            Pool
          </TableHead>
          <TableHead className='text-right bg-[#1015299d] py-5 '>
            First Token Reserve
          </TableHead>
          <TableHead className='text-right bg-[#1015299d] py-5 '>
            Second Token Reserve
          </TableHead>
          <TableHead className='text-right bg-[#1015299d] py-5 '>
            Fees 24H
          </TableHead>

          <TableHead className='bg-[#1015299d] py-5 rounded-se-2xl'></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pools.map((pool) => (
          <PoolItem key={pool.address} pool={pool} />
        ))}
      </TableBody>
    </Table>
  );
};

export default PoolsList;
