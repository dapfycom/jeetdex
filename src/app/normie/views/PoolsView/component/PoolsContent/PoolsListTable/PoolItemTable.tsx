'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import useDisclosure from '@/hooks/useDisclosure';
import { cn } from '@/lib/utils';
import {
  faChartColumn,
  faExchange,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PoolCoins from '@/components/PoolCoins/PoolCoins';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { formatBalance, formatTokenI } from '@/utils/mx-utils';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { IPoolPair } from '../../../utils/types';

const PoolChartModal = dynamic(
  () => import('@/components/PoolChartModal/PoolChartModal')
);

interface IProps {
  pool: IPoolPair;
}

const PoolItem = ({ pool }: IProps) => {
  const { isOpen: clickStar, onToggle: onToggleStar } = useDisclosure();
  const { isOpen: poolChart, onToggle: togglePoolChart } = useDisclosure();
  return (
    <TableRow className='even:bg-[#09091bb6] odd:bg-[#0908182d]'>
      <TableCell className='text-center py-4'>
        <FontAwesomeIcon
          icon={faStar}
          className={cn(
            'cursor-pointer',
            clickStar ? 'text-primary' : 'text-gray-400/50'
          )}
          onClick={onToggleStar}
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
            <Badge className='rounded-full px-1 py-0 text-xs bg-card text-gray-300/80'>
              0.01%
            </Badge>
          </div>
        </div>
      </TableCell>
      <TableCell className='text-right py-4'>
        {formatBalance({
          balance: pool.firstTokenReserve,
          decimals: pool.firstToken.decimals
        })}{' '}
        {formatTokenI(pool.firstToken.ticker)}
      </TableCell>
      <TableCell className='text-right py-4'>
        {' '}
        {formatBalance({
          balance: pool.secondTokenReserve,
          decimals: pool.secondToken.decimals
        })}{' '}
        {formatTokenI(pool.secondToken.ticker)}
      </TableCell>
      <TableCell className='text-right py-4'>$1</TableCell>
      <TableCell className='text-right py-4 flex items-center w-full justify-end gap-3'>
        <Button
          variant='outline'
          className='border-primary text-primary py-4 hover:bg-[#3ff2ff13] rounded-full px-6'
          size='sm'
          onClick={togglePoolChart}
        >
          <FontAwesomeIcon icon={faChartColumn} />
        </Button>

        {poolChart && (
          <PoolChartModal isOpen={poolChart} toggleOpen={togglePoolChart} />
        )}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant='outline'
                className='border-primary text-primary py-4 hover:bg-[#3ff2ff13] rounded-full px-6'
                size='sm'
                asChild
              >
                <Link href={'/'}>
                  <FontAwesomeIcon icon={faExchange} />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Swap</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button
          variant='outline'
          className='border-green-500 text-green-500 py-4 hover:bg-[#3ff2ff13] hover:text-green-500'
          size='sm'
          asChild
        >
          <Link href={`/pools/${pool.lpTokenIdentifier}/add-liquidity`}>
            Deposit
          </Link>
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default PoolItem;
