'use client';
import { IPoolPair } from '@/app/normie/views/PoolsView/utils/types';
import { useAppSelector } from '@/hooks';
import { selectGlobalData } from '@/redux/dapp/dapp-slice';
import { formatBalanceDollar, formatTokenI } from '@/utils/mx-utils';
import Image from 'next/image';
import Link from 'next/link';

interface IProps {
  poolPair?: IPoolPair;
}
const TokenInfo = ({ poolPair }: IProps) => {
  const globalData = useAppSelector(selectGlobalData);

  const token = globalData.coins.find(
    (t) => t.identifier === poolPair?.firstToken?.identifier
  );
  if (!poolPair) return null;

  return (
    <div className='mb-3'>
      <div className='w-full flex mb-1 gap-1 sm:gap-3  justify-between  items-end text-sm flex-wrap '>
        <>
          <div className='flex gap-x-3 gap-y-2 sm:gap-4 flex-wrap justify-between'>
            <span className='text-muted-foreground hidden sm:inline'>
              {formatTokenI(poolPair.firstToken.name)}
            </span>
            <span className='text-muted-foreground hidden sm:inline'>
              Ticker: ${formatTokenI(poolPair.firstToken.identifier)}
            </span>
            <span className='text-primary'>
              Liquidity: $
              {formatBalanceDollar(
                {
                  balance: poolPair.firstTokenReserve,
                  decimals: poolPair.firstToken.decimals
                },
                poolPair.firstTokenJeetdexPrice,
                true
              )}
            </span>

            <span className='text-primary'>
              Market cap: $
              {formatBalanceDollar(
                {
                  balance: poolPair.firstToken.supply,
                  decimals: poolPair.firstToken.decimals
                },
                poolPair.firstTokenJeetdexPrice,
                true
              )}
            </span>
          </div>
          {token?.owner?.username ? (
            <span className='items-center hidden sm:flex'>
              <span className='text-primary mr-1'>created by</span>
              <Link
                href={`/profile/${token.owner.address}`}
                className='flex items-center'
              >
                <Image
                  src={token.owner.img}
                  alt='Profile image'
                  width={16}
                  height={16}
                  className='rounded-full h-4 w-4 mr-1'
                />
                <span className='rounded-sm text-xs bg-lime-400 text-black px-1 h-[18px] flex items-center'>{`${token.owner.username}`}</span>
              </Link>
            </span>
          ) : null}
        </>
      </div>
      <div className='flex justify-between gap-3 flex-wrap'>
        <div className=' flex gap-5'>
          <span className='text-muted-foreground inline sm:hidden'>
            {formatTokenI(poolPair.firstToken.name)}
          </span>
          <span className='text-muted-foreground inline sm:hidden'>
            Ticker: ${formatTokenI(poolPair.firstToken.identifier)}
          </span>
        </div>
        <div className='block sm:hidden'>
          {token?.owner?.username ? (
            <span className='flex items-center'>
              <span className='text-primary mr-1'>created by</span>
              <Link
                href={`/profile/${token.owner.address}`}
                className='flex items-center'
              >
                <Image
                  src={token.owner.img}
                  alt='Profile image'
                  width={16}
                  height={16}
                  className='rounded-full h-4 w-4 mr-1'
                />
                <span className='rounded-sm text-xs bg-lime-400 text-black px-1 h-[18px] flex items-center'>{`${token.owner.username}`}</span>
              </Link>
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default TokenInfo;
