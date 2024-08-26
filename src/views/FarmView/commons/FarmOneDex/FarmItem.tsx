import Collapse from '@/components/Collapse/Collapse';
import Divider from '@/components/Divider/Divider';
import LpTokenImage from '@/components/LpTokenImage/LpTokenImage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useDisclosure from '@/hooks/useDisclosure';
import useGetAccountToken from '@/hooks/useGetAccountToken';
import useGetElrondToken from '@/hooks/useGetElrondToken';
import { useAppSelector } from '@/hooks/useRedux';
import { selectUserAddress } from '@/redux/dapp/dapp-slice';

import { PointerIcon } from '@/components/ui/icons';
import { tokensID } from '@/config';
import { useAuthentication } from '@/hooks';
import {
  formatBalance,
  formatNumber,
  formatTokenI,
  getRealBalance
} from '@/utils/mx-utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTrackTransactionStatus } from '@multiversx/sdk-dapp/hooks';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
import { z } from 'zod';
import { OneDexFarmContext } from './FarmOneDex';
import StakedDetails from './common/StakedInfo/StakedDetails/StakedDetails';
import { useGetApr } from './utils/hooks';
import { stake, withdraw } from './utils/services';

const schema = z.object({
  amount: z.string().min(1, { message: 'Amount is required' })
});

const FarmItem = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { handleConnect, isLoggedIn } = useAuthentication();

  const { farm } = useContext(OneDexFarmContext);
  const address = useAppSelector(selectUserAddress);
  const { accountToken: userStakedToken } = useGetAccountToken(tokensID.egld);
  const lpTokenIdentifier = farm?.lp_token_id || '';
  const [sessionId, setSessionId] = useState<string | null>('');

  const { elrondToken } = useGetElrondToken(lpTokenIdentifier);
  const { apr } = useGetApr();
  const onSuccess = () => {
    mutate([
      'oneDexFarmWsp:getTotalRewardsPerFarm',
      address,
      farm?.farm_click_id
    ]);
  };

  useTrackTransactionStatus({
    transactionId: sessionId,
    onSuccess
  });

  const form = useForm({
    defaultValues: {
      amount: ''
    },
    resolver: zodResolver(schema)
  });

  const handleSubmit = async (values: z.infer<typeof schema>) => {
    const amount = values.amount;
    if (farm?.farm_click_id) {
      const res = await stake(amount, farm.farm_click_id);
      setSessionId(res?.sessionId);
    }
  };
  const handleMax = () => {
    const value = getRealBalance(
      userStakedToken.balance,
      userStakedToken.decimals,
      true
    );
    form.setValue('amount', value.toString());
  };

  if (!farm) return null;
  const handleHarvest = (e: any) => {
    e.stopPropagation();
    withdraw(farm?.farm_click_id);
  };

  return (
    <div className='text-left farm-border'>
      <div className='max-w-[24rem] border rounded-lg p-6'>
        <div>
          <div className='flex items-center gap-3'>
            {' '}
            <h3 className='text-lg font-semibold '>
              {formatTokenI(farm.first_token_id)}-
              {formatTokenI(farm.second_token_id)}
            </h3>
            {elrondToken && <LpTokenImage lpToken={elrondToken} />}
          </div>
        </div>

        <p className='text-sm text-green-600 mb-1'>Active</p>
        <p className='text-sm font-medium mb-4'>
          {apr?.gt(0) && (
            <div className='flex gap-3'>
              <p className='whitespace-nowrap mb-2 ' color='white'>
                APR
              </p>
              <p className=' whitespace-nowrap text-muted-foreground'>
                ≈ {formatNumber(apr?.toString())} %
              </p>
            </div>
          )}
        </p>

        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className='flex flex-col gap-2 mb-4'>
            <div className='flex justify-between'>
              <Label
                htmlFor='amount-bskegld'
                className='hidden sm:block text-right'
              >
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
              id='amount-bskegld'
              name='amount'
              placeholder={formatTokenI(userStakedToken.identifier)}
              type='number'
              value={form.watch('amount')}
              {...form.register('amount')}
            />
            <p className='text-red-700 text-xs'>
              {form.formState.errors.amount?.message}
            </p>
          </div>

          <div>
            {isLoggedIn ? (
              <Button
                type='submit'
                className=' text-xs sm:text-md text-white px-4 py-2 rounded-md flex items-center justify-center space-x-2 w-full'
              >
                <PointerIcon className='h-6 w-6 hidden sm:inline-block' />
                <span>Deposit now with 1-Click®</span>
              </Button>
            ) : (
              <Button
                onClick={handleConnect}
                className=' text-xs sm:text-md text-white px-4 py-2 rounded-md flex items-center justify-center space-x-2 w-full'
              >
                <PointerIcon className='h-6 w-6 hidden sm:inline-block' />
                <span>Deposit now with 1-Click®</span>
              </Button>
            )}
          </div>
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

            <StakedDetails onModal />
          </div>
          <Divider className='my-4' />
          <div className='grid gap-3'>
            <Button
              className='w-full md:w-auto text-sm bg-red-500 text-white hover:text-red-700'
              onClick={handleHarvest}
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
    </div>
  );
};

export default FarmItem;
