import TokenImage from '@/components/TokenImage/TokenImage';
import useGetElrondToken from '@/hooks/useGetElrondToken';
import useGetTokenPrice from '@/hooks/useGetTokenPrice';
import { cn } from '@/lib/utils';
import {
  formatBalance,
  formatBalanceDollar,
  formatTokenI
} from '@/utils/mx-utils';
import { Loader2 } from 'lucide-react';
import { useGetAshSwapDepositEntries } from '../../../utils/hooks';
interface IProps {
  onModal?: boolean;
}

const StakedDetails = ({ onModal }: IProps) => {
  const { depositEntries, isLoading } = useGetAshSwapDepositEntries();
  const { elrondToken: lpToken } = useGetElrondToken(
    depositEntries?.lp_id || null
  );
  const { elrondToken: tokenId } = useGetElrondToken(
    depositEntries?.token_id || null
  );
  if (isLoading)
    return (
      <div className='flex w-full justify-center'>
        <Loader2 className='animate-spin' />
      </div>
    );

  if (!depositEntries) return null;

  return (
    <div
      className={cn(
        'pb-6 flex w-full gap-7 justify-between flex-col lg:flex-row items-center',
        onModal ? 'lg:flex-col items-baseline' : ''
      )}
    >
      <StakedDetail
        title={`Deposited ${depositEntries.token_id}`}
        value={depositEntries?.deposited_amount}
        decimals={tokenId?.decimals}
        tokenI={depositEntries.token_id}
        withPrice
      />
      <StakedDetail
        title={`Deposited ${formatTokenI(depositEntries.lp_id)}`}
        value={depositEntries?.deposited_lp_amount}
        decimals={lpToken?.decimals}
        tokenI={depositEntries.lp_id}
        withPrice
      />
      <StakedDetail
        title={`Earned ${formatTokenI(depositEntries.lp_id)}`}
        value={depositEntries.rewards}
        decimals={lpToken?.decimals}
        tokenI={depositEntries.lp_id}
      />
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
}

const StakedDetail = ({
  title,
  value,
  tokenI,
  decimals,
  withPrice
}: IStakedDetail) => {
  const [price] = useGetTokenPrice(tokenI);

  return (
    <div className='flex gap-3'>
      <TokenImage tokenI={tokenI} size={40} />{' '}
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
