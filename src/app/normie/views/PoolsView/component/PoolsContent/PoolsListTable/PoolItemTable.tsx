'use client';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import useDisclosure from '@/hooks/useDisclosure';
import { cn } from '@/lib/utils';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AddLiquidity from '@/app/normie/views/AddLiquidityView/AddLiquidity';
import { selectNormalDirection } from '@/app/normie/views/SwapView/lib/swap-slice';
import PoolCoins from '@/components/PoolCoins/PoolCoins';
import RequiredLoginWrapper from '@/components/RequiredLoginWrapper/RequiredLoginWrapper';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useAppSelector, useAuthentication } from '@/hooks';
import { formatBalance, formatTokenI } from '@/utils/mx-utils';
import { formatBigNumber } from '@/utils/numbers';
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
  const { isLoggedIn, handleConnect } = useAuthentication();
  const direction = useAppSelector(selectNormalDirection);
  return (
    <TableRow className='hover:bg-[#09091bb6] '>
      <TableCell className='text-center py-4'>
        <RequiredLoginWrapper>
          <FontAwesomeIcon
            icon={faStar}
            className={cn(
              'cursor-pointer',
              isLiked ? 'text-primary' : 'text-gray-400/50'
            )}
            onClick={handleLikePool}
          />
        </RequiredLoginWrapper>
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
        {formatBigNumber(
          formatBalance(
            {
              balance: pool.firstTokenReserve,
              decimals: pool.firstToken.decimals
            },
            true
          )
        )}{' '}
        <span className='text-gray-400'>
          {formatTokenI(pool.firstToken.ticker)}
        </span>
      </TableCell>
      <TableCell className=' py-4'>
        {' '}
        {formatBigNumber(
          formatBalance(
            {
              balance: pool.secondTokenReserve,
              decimals: pool.secondToken.decimals
            },
            true
          )
        )}{' '}
        <span className='text-gray-400'>
          {formatTokenI(pool.secondToken.ticker)}
        </span>
      </TableCell>
      <TableCell className=' py-4 flex items-center w-full justify-end gap-3'>
        <Button
          variant='ghost'
          className='border-primary text-primary py-4 hover:bg-[#3ff2ff13] rounded-sm px-2'
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
          className='border-primary text-primary py-4 hover:bg-[#3ff2ff13] rounded-sm px-2'
          size='sm'
          asChild
        >
          <Link
            href={`/?firstToken=${
              direction ? pool.firstTokenId : pool.secondTokenId
            }&secondToken=${
              direction ? pool.secondTokenId : pool.firstTokenId
            }&direction=${direction ? 'true' : 'false'}`}
          >
            swap
          </Link>
        </Button>

        {isLoggedIn ? (
          <Dialog>
            <DialogTrigger asChild className='w-fit'>
              <Button
                variant='ghost'
                className='border-green-500 text-green-500 py-4 hover:bg-[#3ff2ff13] hover:text-green-500 px-2 rounded-sm'
                size='sm'
              >
                deposit
              </Button>
            </DialogTrigger>
            <DialogContent className='max-w-2xl'>
              <AddLiquidity pool={pool} />
            </DialogContent>
          </Dialog>
        ) : (
          <Button
            variant='ghost'
            className='border-green-500 text-green-500 py-4 hover:bg-[#3ff2ff13] hover:text-green-500  px-2 rounded-sm'
            size='sm'
            onClick={handleConnect}
          >
            deposit
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default PoolItem;
