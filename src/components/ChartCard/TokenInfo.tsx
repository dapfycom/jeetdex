'use client';
import { IPoolPair } from '@/app/normie/views/PoolsView/utils/types';
import { useAppSelector } from '@/hooks';
import { selectGlobalData } from '@/redux/dapp/dapp-slice';
import { formatBalance, formatTokenI } from '@/utils/mx-utils';

interface IProps {
  poolPair?: IPoolPair;
}
const TokenInfo = ({ poolPair }: IProps) => {
  const globalData = useAppSelector(selectGlobalData);

  const token = globalData.coins.find(
    (t) => t.identifier === poolPair?.firstToken?.identifier
  );

  console.log(token);

  return (
    <div className='w-full flex mb-3 gap-3 h-[26.8px] justify-between  items-end'>
      {poolPair && (
        <>
          <span>{formatTokenI(poolPair.firstToken.name)}</span>
          <span>{formatTokenI(poolPair.firstToken.identifier)}</span>
          <span>
            {formatBalance({
              balance: poolPair.firstTokenReserve,
              decimals: poolPair.firstToken.decimals
            })}
          </span>

          <span>150,313,215,122</span>
          <span>
            {token?.owner?.username ? `@${token.owner.username}` : null}
          </span>
        </>
      )}
    </div>
  );
};

export default TokenInfo;
