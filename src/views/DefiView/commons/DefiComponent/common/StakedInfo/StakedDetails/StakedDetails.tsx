import { tokensID } from '@/config';
import useGetElrondToken from '@/hooks/useGetElrondToken';
import useGetTokenPrice from '@/hooks/useGetTokenPrice';
import { cn } from '@/lib/utils';
import { formatBalance, formatBalanceDollar } from '@/utils/mx-utils';
import { calcStakedAmount } from '@/views/DefiView/utils/functions';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useContext } from 'react';
import { FarmContext } from '../../../DefiComponent';

interface IProps {
  onModal?: boolean;
}

const StakedDetails = ({ onModal }: IProps) => {
  const { hatomFarm, deposits, userRewards } = useContext(FarmContext);
  const { elrondToken: depositedToken, isLoading: isloadingDepositToken } =
    useGetElrondToken(hatomFarm?.moneyMarket.tokenI || null);

  const { elrondToken: rewardToken, isLoading: isLoadingRewardToken } =
    useGetElrondToken(tokensID.usdc);

  const staked = deposits ? calcStakedAmount(deposits) : '0';

  if (isLoadingRewardToken || isloadingDepositToken) {
    return (
      <div className='flex justify-center items-center'>
        <Loader2 className='animate-spin' size={50} />
      </div>
    );
  }
  return (
    <div
      className={cn(
        'pb-6 flex w-full gap-7 justify-between flex-col lg:flex-row items-center',
        onModal ? 'lg:flex-col items-baseline' : ''
      )}
    >
      {depositedToken && (
        <StakedDetail
          title='My staked amount'
          value={staked}
          decimals={depositedToken.decimals}
          tokenI={depositedToken.identifier}
          withPrice
          logoUrl={depositedToken.assets.svgUrl}
        />
      )}
      {rewardToken && (
        <StakedDetail
          title={`Current ${rewardToken.ticker} earned`}
          value={userRewards?.rewards || '0'}
          decimals={rewardToken.decimals}
          tokenI={rewardToken.identifier}
          logoUrl={rewardToken.assets.svgUrl}
        />
      )}
    </div>
  );
};

export default StakedDetails;

interface IStakedDetail {
  title: string;
  value: string;
  decimals: number;
  tokenI: string;
  withPrice?: boolean;
  logoUrl: string;
}

export const StakedDetail = ({
  title,
  value,
  tokenI,
  decimals,
  withPrice,
  logoUrl
}: IStakedDetail) => {
  const [price] = useGetTokenPrice(tokenI);

  return (
    <div className='flex gap-3 items-center'>
      <div className='w-[50px] h-[50px]'>
        <Image src={logoUrl} alt='hatom' width={50} height={50} />{' '}
      </div>
      <div className='flex flex-col gap-1'>
        <p>{title}</p>
        <p className='text-sm'>
          {formatBalance({ balance: value, decimals: decimals })}
        </p>
        {withPrice && price && (
          <p className='text-sm'>
            ≈ $
            {formatBalanceDollar({ balance: value, decimals: decimals }, price)}
          </p>
        )}
      </div>
    </div>
  );
};
