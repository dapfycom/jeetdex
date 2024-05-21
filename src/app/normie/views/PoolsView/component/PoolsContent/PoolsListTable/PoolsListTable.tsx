import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import PoolItem from './PoolItemTable';

const PoolsList = () => {
  return (
    <Table>
      <TableHeader className=''>
        <TableRow className=' rounded-2xl'>
          <TableHead className='w-[70px] bg-[#1015299d] py-5 rounded-ss-2xl'></TableHead>

          <TableHead className='w-[100px]  bg-[#1015299d] py-5 '>
            Pool
          </TableHead>
          <TableHead className='text-right bg-[#1015299d] py-5 '>
            Liquidity
          </TableHead>
          <TableHead className='text-right bg-[#1015299d] py-5 '>
            Volume 24H
          </TableHead>
          <TableHead className='text-right bg-[#1015299d] py-5 '>
            Fees 24H
          </TableHead>

          <TableHead className='bg-[#1015299d] py-5 rounded-se-2xl'></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <PoolItem />
        <PoolItem />

        <PoolItem />
        <PoolItem />
        <PoolItem />

        <PoolItem />
        <PoolItem />
        <PoolItem />
      </TableBody>
    </Table>
  );
};

export default PoolsList;
