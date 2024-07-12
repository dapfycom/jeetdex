'use client';
import { Button } from '@/components/ui/button';
import useDisclosure from '@/hooks/useDisclosure';

import AddLiquidity from '@/app/normie/views/AddLiquidityView/AddLiquidity';
import Collapse from '@/components/Collapse/Collapse';
import PoolCoins from '@/components/PoolCoins/PoolCoins';
import RequiredLoginWrapper from '@/components/RequiredLoginWrapper/RequiredLoginWrapper';
import { TokenImageSRC } from '@/components/TokenImage/TokenImage';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { tokensID } from '@/config';
import { useAuthentication } from '@/hooks';
import useGetElrondToken from '@/hooks/useGetElrondToken';
import { cn } from '@/lib/utils';
import { IElrondAccountToken } from '@/types/scTypes';
import {
  formatBalance,
  formatBalanceDollar,
  formatTokenI,
  get_both_tokens_for_given_position
} from '@/utils/mx-utils';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BigNumber from 'bignumber.js';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useLikePool } from '../../../utils/hooks';
import { IPoolPair } from '../../../utils/types';

const PoolChartModal = dynamic(
  () => import('@/components/PoolChartModal/PoolChartModal')
);

interface IProps {
  pool: IPoolPair & { liked: boolean };
  userLp?: IElrondAccountToken;
  onClickLp: () => void;
}

const PoolItem = ({ pool, userLp, onClickLp }: IProps) => {
  const { isOpen: poolChart, onToggle: togglePoolChart } = useDisclosure();
  const { handleLikePool, isLiked } = useLikePool(pool);
  const { isLoggedIn, handleConnect } = useAuthentication();
  const { elrondToken: jeetToken } = useGetElrondToken(tokensID.jeet);
  const {
    isOpen: isOpenPanel,

    onToggle: onTogglePanel
  } = useDisclosure();

  const tokens = get_both_tokens_for_given_position(
    userLp?.balance || '0',
    pool
  );

  const lpDollarAmount = formatBalanceDollar(
    {
      balance: new BigNumber(tokens.secondTokenAmount)
        .multipliedBy(2)
        .toString(),
      decimals: jeetToken?.decimals
    },
    jeetToken?.price
  );

  const poolValue = new BigNumber(
    formatBalanceDollar(
      {
        balance: pool.firstTokenReserve,
        decimals: pool.firstToken.decimals
      },
      pool.firstTokenJeetdexPrice
    )
  )
    .plus(
      new BigNumber(
        formatBalanceDollar(
          {
            balance: pool.secondTokenReserve,
            decimals: pool.secondToken.decimals
          },
          pool.secondToken.price
        )
      )
    )
    .toNumber();

  return (
    <div>
      <div
        className='hover:bg-[#09091bb6] bg-card rounded-sm grid md:grid-cols-4 grid-cols-1 gap-2 sm:gap-4 p-4 cursor-pointer'
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onTogglePanel();
        }}
      >
        <div className='flex '>
          <div className='font-medium py-2 sm:py-4'>
            <div className='flex'>
              <div className='flex flex-col'>
                <PoolCoins
                  size={18}
                  src1={pool?.firstToken?.assets?.svgUrl}
                  src2={pool?.secondToken?.assets?.svgUrl}
                  identifier1={pool.firstTokenId}
                  identifier2={pool.secondTokenId}
                />
              </div>

              <div>
                <div className='whitespace-nowrap'>
                  {formatTokenI(pool.firstToken.ticker)}-
                  {formatTokenI(pool.secondToken.ticker)}
                </div>
                <span className='text-gray-400'>${poolValue}</span>
              </div>
            </div>
          </div>
        </div>
        {/* <div className=' py-2 sm:py-4'>
        <div>
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
        </div>
        <div>
          ${' '}
          {formatBalanceDollar(
            {
              balance: pool.firstTokenReserve,
              decimals: pool.firstToken.decimals
            },
            pool.firstTokenJeetdexPrice,
            true
          )}
        </div>
      </div>
      <div className=' py-2 sm:py-4'>
        <div>
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
        </div>

        <div>
          ${' '}
          {formatBalanceDollar(
            {
              balance: pool.secondTokenReserve,
              decimals: pool.secondToken.decimals
            },
            pool.secondToken.price,
            true
          )}
        </div>
      </div>{' '} */}
        <div className=' py-2 sm:py-4  flex flex-col w-fit'>
          <span>Fee Rewards</span>
          <div className='text-sm text-gray-400 '>
            <span className='border-b border-dashed border-gray-400 pb-1'>
              0.07 %
            </span>
          </div>
        </div>
        <div className='w-full'>
          <div
            className='hover:bg-teal-400/10 py-2 sm:px-4 sm:py-4 rounded-sm cursor-pointer flex flex-col items-center w-fit'
            onClick={(e) => {
              e.stopPropagation();
              onClickLp();
            }}
          >
            <span>My LP</span>
            <div className='text-sm text-gray-400 '>
              <span>{userLp ? formatBalance(userLp) : '0'}</span>= $
              {lpDollarAmount}
            </div>
          </div>
        </div>
        <div className='py-2 sm:py-4 flex flex-col sm:flex-row items-center w-full justify-end gap-3 '>
          <Button
            className='border-primary py-2 sm:py-4 hover:bg-[#3ff2ff13] rounded-sm px-2 w-full hover:text-white'
            size='sm'
            onClick={(e) => {
              e.stopPropagation();
              togglePoolChart();
            }}
          >
            chart
          </Button>

          {poolChart && (
            <PoolChartModal
              isOpen={poolChart}
              toggleOpen={togglePoolChart}
              poolPair={pool}
            />
          )}
          <Button
            className='border-primary py-2 sm:py-4 hover:bg-[#3ff2ff13] rounded-sm px-2 w-full hover:text-white'
            size='sm'
            asChild
          >
            <Link href={`/?swap=${pool.firstTokenId}`}>swap</Link>
          </Button>

          {isLoggedIn ? (
            <Dialog>
              <DialogTrigger asChild className='w-fit'>
                <Button
                  className=' py-2 sm:py-4 hover:bg-[#3ff2ff13] px-2 rounded-sm w-full hover:text-white'
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
              className='border-green-500  py-2 sm:py-4 hover:bg-[#3ff2ff13] w-full  px-2 rounded-sm hover:text-white'
              size='sm'
              onClick={handleConnect}
            >
              deposit
            </Button>
          )}

          <div className='text-center mt-1'>
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
          </div>
        </div>
      </div>
      <Collapse isOpen={isOpenPanel}>
        <div className='bg-slate-900 p-8 flex flex-col gap-3'>
          <div className='flex justify-between items-center'>
            <div className='flex gap-3 items-center'>
              <TokenImageSRC
                alt={`${pool.secondToken.name} logo`}
                identifier={pool.secondTokenId}
                size={30}
                src={pool.secondToken.assets?.svgUrl}
                className='w-8 h-8 rounded-full'
              />
              <h4>
                Total{' '}
                <span className='text-gray-400'>
                  {' '}
                  {formatTokenI(pool.secondToken.ticker)}
                </span>
              </h4>
            </div>

            <p>
              {formatBalance({
                balance: pool.secondTokenReserve,
                decimals: pool.secondToken.decimals
              })}
            </p>
          </div>

          <div className='flex justify-between items-center'>
            <div className='flex gap-3 items-center'>
              <TokenImageSRC
                alt={`${pool.firstToken.name} logo`}
                identifier={pool.firstTokenId}
                size={30}
                src={pool.firstToken.assets?.svgUrl}
                className='w-8 h-8 rounded-full'
              />
              <h4>
                Total
                <span className='text-gray-400 ml-2'>
                  {formatTokenI(pool.firstToken.ticker)}
                </span>
              </h4>
            </div>

            <p>
              {formatBalance({
                balance: pool.firstTokenReserve,
                decimals: pool.firstToken.decimals
              })}
            </p>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default PoolItem;
