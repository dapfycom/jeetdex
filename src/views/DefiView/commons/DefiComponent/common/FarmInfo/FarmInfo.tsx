import useGetElrondToken from '@/hooks/useGetElrondToken';
import { HatomConfigs } from '@/views/DefiView/utils/constants';
import { Loader2 } from 'lucide-react';
import { useContext } from 'react';
import { FarmContext } from '../../DefiComponent';

const FarmInfo = () => {
  const { hatomFarm } = useContext(FarmContext);
  const { elrondToken: depositedToken, isLoading: isloadingDepositToken } =
    useGetElrondToken(hatomFarm?.moneyMarket.tokenI || null);

  if (isloadingDepositToken) {
    return (
      <div className='flex justify-center items-center'>
        <Loader2 className='animate-spin' size={50} />
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const apy = HatomConfigs.apy[formatTokenI(hatomFarm?.moneyMarket.tokenI)];

  return (
    <div
      className={`flex gap-7  flex-col lg:flex-row flex-1 ${
        depositedToken ? 'justify-end' : 'justify-center'
      } `}
    >
      {/* {depositedToken && (
        <FarmDetail
          title="My staked amount"
          value={staked}
          decimals={depositedToken.decimals}
          tokenI={depositedToken.identifier}
        />
      )}
      {rewardToken && (
        <FarmDetail
          title={`Current ${rewardToken.ticker} earned`}
          value={userRewards?.rewards || "0"}
          decimals={rewardToken.decimals}
          tokenI={rewardToken.identifier}
        />
      )} */}
      {/* <div className="flex gap-2">
        <Loader2 className="animate-spin" /> Optimising for the best APR
      </div> */}
      {apy && (
        <div className='flex flex-col'>
          <p className='whitespace-nowrap mb-2 ' color='white'>
            APY
          </p>
          <p className='text-[12px] whitespace-nowrap text-muted-foreground'>
            ≈ {apy} %
          </p>
        </div>
      )}
    </div>
  );
};

export default FarmInfo;
