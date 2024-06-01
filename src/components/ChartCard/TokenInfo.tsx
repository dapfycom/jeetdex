'use client';
import { IPoolPair } from '@/app/normie/views/PoolsView/utils/types';
import { useAppSelector } from '@/hooks';
import { selectGlobalData } from '@/redux/dapp/dapp-slice';
import { formatBalanceDollar, formatTokenI } from '@/utils/mx-utils';

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
    <div className='w-full flex mb-3 gap-3 h-[26.8px] justify-between  items-end'>
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
          <span>
            {token?.owner?.username
              ? `created by: @${token.owner.username}`
              : null}
          </span>
        </>
      )}
    </div>
  );
};

export default TokenInfo;
