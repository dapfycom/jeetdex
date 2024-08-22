'use client';
import Collapse from '@/components/Collapse/Collapse';
import Divider from '@/components/Divider/Divider';
import TokenImage from '@/components/TokenImage/TokenImage';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { PointerIcon } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { tokensID } from '@/config';
import { useAuthentication } from '@/hooks/useAuthentication';
import useDisclosure from '@/hooks/useDisclosure';
import useGetAccountToken from '@/hooks/useGetAccountToken';
import useGetElrondToken from '@/hooks/useGetElrondToken';
import useGetTokenPrice from '@/hooks/useGetTokenPrice';
import {
  formatBalance,
  formatBalanceDollar,
  formatTokenI,
  getRealBalance
} from '@/utils/mx-utils';
import { useStakeBskInfo } from '@/views/FarmView/utils/hooks';
import {
  claimBskRewards,
  restakeBsk,
  stakeBSK
} from '@/views/FarmView/utils/services';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import StakedDetails from './StakedDetails';
import WithdrawModal from './WithdrawModal';

const StakeBSK = () => {
  const { data } = useStakeBskInfo();
  const { handleConnect, isLoggedIn } = useAuthentication();
  const { isOpen, onToggle } = useDisclosure();
  const { elrondToken } = useGetElrondToken(tokensID.bsk);
  const [price] = useGetTokenPrice(tokensID.bsk);

  const { accountToken: userStakedToken } = useGetAccountToken(tokensID.bsk);
  const {
    isOpen: isOpenHarvest,
    onClose: onCloseHarvest,
    onOpen: onOpenHarvest
  } = useDisclosure();

  const [maxAmount, setMaxAmount] = useState<number>(0);

  const stakeSchema = z.object({
    amount: z
      .number()
      .min(
        getRealBalance(
          data?.minimumStaking || 0,
          userStakedToken.decimals,
          true
        ) as number,
        `Minimum stake is ${formatBalance({
          balance: data?.minimumStaking || 0,
          decimals: userStakedToken.decimals
        })}`
      )
      .max(maxAmount, 'Insufficient funds')
  });

  type StakeFormData = z.infer<typeof stakeSchema>;

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<StakeFormData>({
    resolver: zodResolver(stakeSchema),
    defaultValues: {
      amount: 0
    }
  });

  const onSubmit = (values: StakeFormData) => {
    stakeBSK(values.amount.toString(), elrondToken);
  };

  const handleMax = () => {
    const value = getRealBalance(
      userStakedToken.balance,
      userStakedToken.decimals,
      true
    );
    setMaxAmount(Number(value));
    setValue('amount', Number(value));
  };

  const handleWithdraw = () => {
    onCloseHarvest();
    onOpenHarvest();
  };

  const handleReStake = () => {
    restakeBsk();
  };

  const handleClaim = () => {
    claimBskRewards();
  };

  return (
    <>
      <div className='w-full my-10 flex text-left'>
        <div className='max-w-[24rem] w-full rounded-lg border p-6'>
          <div className='mb-4'>
            <div className='flex items-center gap-3'>
              <h3 className='text-lg font-semibold'>STAKE BSK</h3>
              {elrondToken && (
                <TokenImage src={elrondToken.assets.svgUrl} size={32} />
              )}
            </div>
          </div>

          {data && elrondToken && (
            <div className='mb-2'>
              <h4 className='flex gap-2'>
                TVL:
                <span className=''>
                  $
                  {formatBalanceDollar(
                    { balance: data.staked, decimals: elrondToken.decimals },
                    price,
                    true
                  )}
                </span>
              </h4>
              <h4 className='flex gap-2'>
                Users:
                <span className=''>{data.totalUsers}</span>
              </h4>
              <h4 className='flex gap-2 text-yellow-600'>10% APY</h4>
            </div>
          )}

          <p className='text-sm text-green-600 mb-1'>Active</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-2 mb-4'>
              <div className='flex justify-between'>
                <Label
                  htmlFor='amount-bskegld'
                  className='hidden sm:block text-right'
                >
                  Deposit BSK
                </Label>
                <div className='flex justify-between text-xs'>
                  <p className='cursor-pointer' onClick={handleMax}>
                    Balance: {formatBalance(userStakedToken)}{' '}
                    {formatTokenI(userStakedToken.identifier)}
                  </p>
                </div>
              </div>
              <Controller
                name='amount'
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id='amount-bskegld'
                    placeholder={formatTokenI(userStakedToken.identifier)}
                    type='number'
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    value={field.value || ''}
                  />
                )}
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

          <Collapse isOpen={isOpen}>
            <Divider className='mt-4' />
            <div className='my-3'>
              <div className='mb-2'>My positions</div>
              <StakedDetails onModal />
              <Button
                variant={'secondary'}
                className='text-sm w-full bg-blue-600 hover:text-blue-500 text-white'
                onClick={handleClaim}
              >
                Claim
              </Button>
            </div>
            <Divider className='my-4' />
            <div className='grid gap-3'>
              <Button
                variant={'secondary'}
                className='text-sm w-full lg:w-auto bg-green-600 hover:text-green-500 text-white'
                onClick={handleReStake}
              >
                Restake
              </Button>
              <Button
                variant={'secondary'}
                className='w-full md:w-auto text-sm bg-red-500 text-white hover:text-red-700'
                onClick={handleWithdraw}
              >
                Unstake
              </Button>

              {isOpenHarvest && (
                <WithdrawModal
                  isOpen={isOpenHarvest}
                  onClose={onCloseHarvest}
                />
              )}
            </div>
          </Collapse>

          <div className='flex justify-center mt-6'>
            <Button variant={'outline'} size={'sm'} onClick={onToggle}>
              {isOpen ? 'Less' : 'More'} info
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StakeBSK;
