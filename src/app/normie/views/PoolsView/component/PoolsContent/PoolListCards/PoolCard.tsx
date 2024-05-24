'use client';
import PoolCoins from '@/components/PoolCoins/PoolCoins';
import { Button } from '@/components/ui/button';
import useDisclosure from '@/hooks/useDisclosure';
import { jeetStaticData } from '@/localConstants/tokensStaticsData';
import { formatBalance, formatTokenI } from '@/utils/mx-utils';
import { faChartColumn, faExchange } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { IPoolPair } from '../../../utils/types';
const PoolChartModal = dynamic(
  () => import('@/components/PoolChartModal/PoolChartModal')
);

interface IProps {
  pool: IPoolPair;
}

const PoolCard = ({ pool }: IProps) => {
  const { isOpen: poolChart, onToggle: togglePoolChart } = useDisclosure();

  return (
    <div className='bg-[#1C243E] rounded-3xl py-6 px-4 w-full'>
      <div className='flex flex-col items-center w-full mb-4'>
        <PoolCoins
          src1={pool?.firstToken?.assets?.svgUrl}
          src2={pool?.secondToken?.assets?.svgUrl}
          size={26}
          className='w-[50px] h-[50px]'
        />

        <h3 className='mt-1 text-xl'>
          {' '}
          {formatTokenI(pool.firstToken.ticker)} -
          {formatTokenI(pool.secondToken.ticker)}
        </h3>
      </div>

      <div className='bg-[rgba(171,_196,_255,_0.07)] rounded-lg text-primary text-center py-2'>
        124.21% APR
      </div>

      <div className='w-full flex flex-col gap-3 text-sm mt-5 mb-5'>
        <div className='flex w-full justify-between'>
          <p className='text-muted-foreground'>Fee Tier</p>
          <p className='bg-[rgba(171,196,255,0.19)] w-fit rounded-full px-2 text-xs flex items-center'>
            0.05%
          </p>
        </div>

        <div className='flex w-full justify-between'>
          <p className='text-muted-foreground'>
            {formatTokenI(pool.firstToken.ticker)} Reserve
          </p>
          <p className=''>
            {' '}
            {formatBalance({
              balance: pool.firstTokenReserve,
              decimals: pool.firstToken.decimals
            })}{' '}
          </p>
        </div>
        <div className='flex w-full justify-between'>
          <p className='text-muted-foreground'>
            {' '}
            {formatTokenI(pool.secondToken.ticker)} Reserve
          </p>
          <p className=''>
            {formatBalance({
              balance: pool.secondTokenReserve,
              decimals: pool.secondToken.decimals
            })}
          </p>
        </div>

        <div className='flex w-full justify-between'>
          <p className='text-muted-foreground'>TVL</p>
          <p className=''>$3,073,071.48</p>
        </div>

        <div className='flex w-full justify-between'>
          <p className='text-muted-foreground'>Rewards</p>
          <p className=''>
            <Image
              src={jeetStaticData.assets.svgUrl}
              alt='Reward token'
              width={32}
              height={32}
              className='rounded-full w-5  h-5'
            ></Image>
          </p>
        </div>
      </div>

      <div className='w-full flex gap-3 justify-center text-primary'>
        <Button
          variant='ghost'
          className='hover:bg-[#27837e4d] hover:text-primary'
          onClick={togglePoolChart}
        >
          View Chart <FontAwesomeIcon icon={faChartColumn} className='ml-2' />
        </Button>

        {poolChart && (
          <PoolChartModal isOpen={poolChart} toggleOpen={togglePoolChart} />
        )}

        <Button
          variant='ghost'
          className='hover:bg-[#27837e4d] hover:text-primary'
          asChild
        >
          <Link href={'/'}>
            Swap <FontAwesomeIcon icon={faExchange} className='ml-2' />
          </Link>
        </Button>
      </div>

      <Button className='w-full mt-3'>
        <Link href={`/pools/${pool.lpTokenIdentifier}/add-liquidity`}>
          Deposit
        </Link>
      </Button>
    </div>
  );
};

export default PoolCard;
