'use client';
import { IPoolPair } from '@/app/normie/views/PoolsView/utils/types';
import { useAppSelector } from '@/hooks';
import { selectGlobalData } from '@/redux/dapp/dapp-slice';
import { formatBalanceDollar, formatTokenI } from '@/utils/mx-utils';
import Link from 'next/link';
import { Avatar, AvatarImage } from '../ui/avatar';

interface IProps {
  poolPair?: IPoolPair;
}
const TokenInfo = ({ poolPair }: IProps) => {
  const globalData = useAppSelector(selectGlobalData);
  console.log(globalData);

  const token = globalData.coins.find(
    (t) => t.identifier === poolPair?.firstToken?.identifier
  );

  console.log(poolPair);

  console.log(token);

  return (
    <div className='w-full flex mb-3 gap-3 h-[26.8px] justify-between  items-end text-md'>
      {poolPair && (
        <>
          <span>{formatTokenI(poolPair.firstToken.name)}</span>
          <span>ticker: ${formatTokenI(poolPair.firstToken.identifier)}</span>
          <span>
            liquidity: $
            {formatBalanceDollar(
              {
                balance: poolPair.firstTokenReserve,
                decimals: poolPair.firstToken.decimals
              },
              poolPair.firstTokenJeetdexPrice
            )}
          </span>

          <span>
            market cap: $
            {formatBalanceDollar(
              {
                balance: poolPair.firstToken.supply,
                decimals: poolPair.firstToken.decimals
              },
              poolPair.firstTokenJeetdexPrice
            )}
          </span>
          {token?.owner?.username ? (
            <span className='flex items-center'>
              <span>created by:</span>
              <Link
                href={`/profile/${token.owner.id}`}
                className='flex items-center'
              >
                <Avatar className='h-4 w-4 mr-1'>
                  <AvatarImage
                    alt='Profile picture'
                    src={token.owner.img}
                    className='w-4 h-4'
                  />
                </Avatar>
                <span>{`@${token.owner.username}`}</span>
              </Link>
            </span>
          ) : null}
        </>
      )}
    </div>
  );
};

export default TokenInfo;
