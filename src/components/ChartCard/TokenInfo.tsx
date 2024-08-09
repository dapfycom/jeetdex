'use client';
import { useAppSelector } from '@/hooks';
import { selectGlobalData } from '@/redux/dapp/dapp-slice';
import { formatBalanceDollar, formatTokenI } from '@/utils/mx-utils';
import Image from 'next/image';
import Link from 'next/link';

const TokenInfo = ({
  firstToken,
  firstTokenJeetdexPrice
}: {
  firstToken: {
    name: string;
    identifier: string;
    decimals: number;
    supply: number | string;
  };

  firstTokenJeetdexPrice: number;
}) => {
  const globalData = useAppSelector(selectGlobalData);

  const coin = globalData.coins.find(
    (t) => t.identifier === firstToken?.identifier
  );
  if (!firstToken || !firstTokenJeetdexPrice || !coin) return null;
  const isDegen = Boolean(coin?.degenId);
  return (
    <div className='mb-3'>
      <div className='w-full flex mb-1 gap-1 sm:gap-3  justify-between  items-end text-sm flex-wrap '>
        <>
          <div className='flex gap-x-3 gap-y-2 sm:gap-4 flex-wrap justify-between'>
            <span className='text-muted-foreground hidden sm:inline'>
              {formatTokenI(firstToken.name)}
            </span>
            <span className='text-muted-foreground hidden sm:inline'>
              Ticker: ${formatTokenI(firstToken.identifier)}
            </span>

            <span className='text-primary'>
              Market cap: $
              {formatBalanceDollar(
                {
                  balance: firstToken.supply,
                  decimals: isDegen ? 0 : firstToken.decimals
                },
                firstTokenJeetdexPrice,
                true
              )}
            </span>
          </div>
          {coin?.owner?.username ? (
            <span className='items-center hidden sm:flex'>
              <span className='text-primary mr-1'>created by</span>
              <Link
                href={`/profile/${coin.owner.address}`}
                className='flex items-center'
              >
                <Image
                  src={coin.owner.img}
                  alt='Profile image'
                  width={16}
                  height={16}
                  className='rounded-full h-4 w-4 mr-1'
                />
                <span className='rounded-sm text-xs bg-lime-400 text-black px-1 h-[18px] flex items-center'>{`${coin.owner.username}`}</span>
              </Link>
            </span>
          ) : null}
        </>
      </div>
      <div className='flex justify-between gap-3 flex-wrap'>
        <div className=' flex gap-5'>
          <span className='text-muted-foreground inline sm:hidden'>
            {formatTokenI(firstToken.name)}
          </span>
          <span className='text-muted-foreground inline sm:hidden'>
            Ticker: ${formatTokenI(firstToken.identifier)}
          </span>
        </div>
        <div className='block sm:hidden'>
          {coin?.owner?.username ? (
            <span className='flex items-center'>
              <span className='text-primary mr-1'>created by</span>
              <Link
                href={`/profile/${coin.owner.address}`}
                className='flex items-center'
              >
                <Image
                  src={coin.owner.img}
                  alt='Profile image'
                  width={16}
                  height={16}
                  className='rounded-full h-4 w-4 mr-1'
                />
                <span className='rounded-sm text-xs bg-lime-400 text-black px-1 h-[18px] flex items-center'>{`${coin.owner.username}`}</span>
              </Link>
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default TokenInfo;
