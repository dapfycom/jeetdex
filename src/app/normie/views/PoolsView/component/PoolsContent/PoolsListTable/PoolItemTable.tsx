'use client';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import useDisclosure from '@/hooks/useDisclosure';
import { cn } from '@/lib/utils';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AddLiquidity from '@/app/normie/views/AddLiquidityView/AddLiquidity';
import PoolCoins from '@/components/PoolCoins/PoolCoins';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { formatBalance, formatTokenI } from '@/utils/mx-utils';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useLikePool } from '../../../utils/hooks';
import { IPoolPair } from '../../../utils/types';

const PoolChartModal = dynamic(
  () => import('@/components/PoolChartModal/PoolChartModal')
);

interface IProps {
  pool: IPoolPair & { liked: boolean };
}

const PoolItem = ({ pool }: IProps) => {
  const { isOpen: poolChart, onToggle: togglePoolChart } = useDisclosure();
  const { handleLikePool, isLiked } = useLikePool(pool);

  return (
    <TableRow className='hover:bg-[#09091bb6] '>
      <TableCell className='text-center py-4'>
        <FontAwesomeIcon
          icon={faStar}
          className={cn(
            'cursor-pointer',
            isLiked ? 'text-primary' : 'text-gray-400/50'
          )}
          onClick={handleLikePool}
        />
      </TableCell>

      <TableCell className='font-medium py-4'>
        <div className='flex'>
          <PoolCoins
            size={18}
            src1={pool?.firstToken?.assets?.svgUrl}
            src2={pool?.secondToken?.assets?.svgUrl}
            identifier1={pool.firstTokenId}
            identifier2={pool.secondTokenId}
          />

          <div>
            <div className='whitespace-nowrap'>
              {formatTokenI(pool.firstToken.ticker)}-
              {formatTokenI(pool.secondToken.ticker)}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell className=' py-4'>
        {formatBalance({
          balance: pool.firstTokenReserve,
          decimals: pool.firstToken.decimals
        })}{' '}
        {formatTokenI(pool.firstToken.ticker)}
      </TableCell>
      <TableCell className=' py-4'>
        {' '}
        {formatBalance({
          balance: pool.secondTokenReserve,
          decimals: pool.secondToken.decimals
        })}{' '}
        {formatTokenI(pool.secondToken.ticker)}
      </TableCell>
      <TableCell className=' py-4'>$1</TableCell>
      <TableCell className=' py-4 flex items-center w-full justify-end gap-3'>
        <Button
          variant='ghost'
          className='border-primary text-primary py-4 hover:bg-[#3ff2ff13] rounded-full px-6'
          size='sm'
          onClick={togglePoolChart}
        >
          chart
        </Button>

        {poolChart && (
          <PoolChartModal isOpen={poolChart} toggleOpen={togglePoolChart} />
        )}
        <Button
          variant='ghost'
          className='border-primary text-primary py-4 hover:bg-[#3ff2ff13] rounded-full px-6'
          size='sm'
          asChild
        >
          <Link href={'/'}>swap</Link>
        </Button>

        <Dialog>
          <DialogTrigger asChild className='w-fit'>
            <Button
              variant='ghost'
              className='border-green-500 text-green-500 py-4 hover:bg-[#3ff2ff13] hover:text-green-500 w-[70px] '
              size='sm'
            >
              deposit
            </Button>
          </DialogTrigger>
          <DialogContent className='max-w-2xl'>
            <AddLiquidity pool={pool} />
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
};

export default PoolItem;
