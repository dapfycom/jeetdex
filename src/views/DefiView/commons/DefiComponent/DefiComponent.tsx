'use client';
import Collapse from '@/components/Collapse/Collapse';
import Divider from '@/components/Divider/Divider';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthentication } from '@/hooks';
import useDisclosure from '@/hooks/useDisclosure';
import useGetAccountToken from '@/hooks/useGetAccountToken';
import useGetElrondToken from '@/hooks/useGetElrondToken';
import {
  IMoneyMarkeTvl,
  IMoneyMarketDeposit,
  IMoneyMarketReward
} from '@/types/hatom.interface';
import { formatBalance, formatTokenI, getRealBalance } from '@/utils/mx-utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { PointerIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { HatomConfigs } from '../../utils/constants';
import { claimUserRewards, deposit, withdraw } from '../../utils/services';
import StakedDetails from './common/StakedInfo/StakedDetails/StakedDetails';

interface IDefiContext {
  hatomFarm?: IMoneyMarkeTvl;
  userRewards?: IMoneyMarketReward;
  deposits?: IMoneyMarketDeposit[];
}

export const FarmContext = React.createContext<IDefiContext>({
  hatomFarm: undefined,
  userRewards: undefined,
  deposits: []
});
interface FarmComponentProps {
  hatomFarm: IMoneyMarkeTvl;
  userInfo: {
    userRewards?: IMoneyMarketReward;
    deposits?: IMoneyMarketDeposit[];
  };
}
const FarmComponent = ({ hatomFarm, userInfo }: FarmComponentProps) => {
  const { isOpen, onToggle } = useDisclosure();
  const { handleConnect, isLoggedIn } = useAuthentication();

  // const [sessionId, setSessionId] = useState<string | null>('');
  const { elrondToken } = useGetElrondToken(hatomFarm.moneyMarket.tokenI);

  const minAmounts = HatomConfigs.minDeposit;

  const { elrondToken: stakedToken } = useGetElrondToken(
    hatomFarm?.moneyMarket.tokenI || null
  );
  const { accountToken: userStakedToken } = useGetAccountToken(
    hatomFarm?.moneyMarket.tokenI || ''
  );

  const ticker = hatomFarm?.moneyMarket.tokenI
    ? formatTokenI(hatomFarm?.moneyMarket.tokenI)
    : '';
  const minAmountToStake =
    minAmounts[ticker as keyof typeof minAmounts] || 0.00001;

  const stakeSchema = z.object({
    amount: z
      .number()
      .min(
        minAmountToStake + 0.00001,
        `The minimum amount is more than ${minAmountToStake} ${ticker}`
      )
      .max(
        Number(formatBalance(userStakedToken, true, 18)),
        'Insufficient funds'
      )
  });

  type StakeFormValues = z.infer<typeof stakeSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<StakeFormValues>({
    resolver: zodResolver(stakeSchema),
    defaultValues: {
      amount: 0
    }
  });

  const onSubmit = async (values: StakeFormValues) => {
    if (hatomFarm) {
      /* const res =  */ await deposit(
        values.amount.toString(),
        stakedToken,
        hatomFarm?.moneyMarket.childScAddress
      );
      // setSessionId(res?.sessionId);
    }
  };

  const handleMax = () => {
    const value = getRealBalance(
      userStakedToken.balance,
      userStakedToken.decimals,
      true
    );
    setValue('amount', Number(value));
  };

  const handleClaimRewards = () => {
    if (hatomFarm) {
      claimUserRewards(hatomFarm?.moneyMarket.childScAddress);
    }
  };

  const handleWithdraw = () => {
    if (hatomFarm) {
      withdraw(hatomFarm.moneyMarket.childScAddress);
    }
  };

  const apy =
    HatomConfigs.apy[
      formatTokenI(
        hatomFarm?.moneyMarket.tokenI
      ) as keyof typeof HatomConfigs.apy
    ];

  return (
    <FarmContext.Provider
      value={{
        hatomFarm: hatomFarm,
        userRewards: userInfo.userRewards,
        deposits: userInfo.deposits
      }}
    >
      <div className='w-full text-left'>
        <div className='w-full rounded-lg border p-6'>
          <div className='flex items-center gap-3'>
            {' '}
            <h3 className='text-lg font-semibold'>
              {formatTokenI(hatomFarm.moneyMarket.tokenI)} Pool
            </h3>
            {elrondToken?.assets?.svgUrl && (
              <div className='w-[40px] h-[40px]'>
                <Image
                  src={elrondToken.assets.svgUrl}
                  alt='hatom'
                  width={40}
                  height={40}
                />{' '}
              </div>
            )}
          </div>
        </div>

        <p className='text-sm text-green-600 mb-1'>Active</p>
        <p className='text-sm font-medium mb-4'>
          {apy && (
            <div className='flex gap-3'>
              <p className='whitespace-nowrap mb-2 ' color='white'>
                APY
              </p>
              <p className='whitespace-nowrap text-muted-foreground'>
                ≈ {apy} %
              </p>
            </div>
          )}
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-2 mb-4'>
            <div className='flex justify-between'>
              <Label htmlFor='amount' className='hidden sm:block text-right'>
                Deposit Amount
              </Label>
              <div className='flex justify-between text-xs'>
                <p className='cursor-pointer' onClick={handleMax}>
                  Balance: {formatBalance(userStakedToken)}{' '}
                  {formatTokenI(userStakedToken.identifier)}
                </p>
              </div>
            </div>
            <Input
              id='amount'
              type='number'
              placeholder={formatTokenI(userStakedToken.identifier)}
              {...register('amount', { valueAsNumber: true })}
            />
            {errors.amount && (
              <p className='text-red-700 text-xs'>{errors.amount.message}</p>
            )}
          </div>

          <DialogFooter>
            {isLoggedIn ? (
              <Button
                type='submit'
                className='text-xs sm:text-md text-white px-4 py-2 rounded-md flex items-center justify-center space-x-2 w-full'
              >
                <PointerIcon className='h-6 w-6 hidden sm:inline-block' />
                <span>Deposit now with 1-Click®</span>
              </Button>
            ) : (
              <Button
                onClick={handleConnect}
                className='text-xs sm:text-md text-white px-4 py-2 rounded-md flex items-center justify-center space-x-2 w-full'
              >
                <PointerIcon className='h-6 w-6 hidden sm:inline-block' />
                <span>Deposit now with 1-Click®</span>
              </Button>
            )}
          </DialogFooter>
        </form>

        <p
          className='text-sm italic mt-4'
          style={{
            textAlign: 'center'
          }}
        >
          No lock period, you can withdraw anytime.
        </p>
        <Collapse isOpen={isOpen}>
          <Divider className='mt-4' />

          <div className='my-3'>
            <div className='mb-2'>My positions</div>

            <StakedDetails onModal={true} />
          </div>
          <Divider className='my-4' />
          <div className='grid gap-3'>
            <Button
              className='text-sm w-full bg-green-600 text-white hover:text-green-500'
              onClick={handleClaimRewards}
            >
              Claim rewards
            </Button>

            <Button
              className='w-full md:w-auto text-sm hover:text-red-700 bg-red-500 text-white'
              onClick={handleWithdraw}
            >
              {' '}
              withdraw
            </Button>
          </div>
        </Collapse>

        <div className='flex justify-center mt-6'>
          <Button variant={'outline'} size={'sm'} onClick={onToggle}>
            {isOpen ? 'Less' : 'More'} info
          </Button>
        </div>
      </div>
    </FarmContext.Provider>
  );
};

export default FarmComponent;
