import Divider from '@/components/Divider/Divider';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useGetAccountToken from '@/hooks/useGetAccountToken';
import useGetElrondToken from '@/hooks/useGetElrondToken';
import { formatBalance, formatTokenI, getRealBalance } from '@/utils/mx-utils';
import { HatomConfigs } from '@/views/DefiView/utils/constants';
import { deposit } from '@/views/DefiView/utils/services';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTrackTransactionStatus } from '@multiversx/sdk-dapp/hooks';
import { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { FarmContext } from '../../DefiComponent';
import StakedDetails from '../StakedInfo/StakedDetails/StakedDetails';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const StakeModal = ({ isOpen, onClose }: IProps) => {
  const { hatomFarm } = useContext(FarmContext);
  const [sessionId, setSessionId] = useState<string | null>('');

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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const minAmountToStake = minAmounts[ticker] || 0.00001;

  const stakeSchema = z.object({
    amount: z
      .number()
      .min(
        minAmountToStake + 0.00001,
        `The minimum amount is more than ${minAmountToStake} ${ticker}`
      )
      .max(
        formatBalance(userStakedToken, true, 18) as number,
        'Insufficient funds'
      )
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

  const onSuccess = () => {
    onClose();
  };

  useTrackTransactionStatus({
    transactionId: sessionId,
    onSuccess,
    onFail: (transactionId: string | null, errorMessage?: string) => {
      console.error('transactionId', transactionId);
      console.error('errorMessage', errorMessage);
    }
  });

  const onSubmit = async (data: StakeFormData) => {
    if (hatomFarm) {
      const res = await deposit(
        data.amount.toString(),
        stakedToken,
        hatomFarm?.moneyMarket.childScAddress
      );
      setSessionId(res?.sessionId);
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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='max-w-[24rem]'>
        <DialogHeader>
          <DialogTitle>
            <h3 className='text-lg font-semibold mb-4'>
              Auto-Compounded DeFi Farming
            </h3>
          </DialogTitle>
        </DialogHeader>

        <p className='text-sm text-green-600 mb-1'>Active</p>
        <p className='text-sm font-medium mb-4'>
          10% - 1000% Annual Yield (Subject to Market Variations)
        </p>
        <p className='text-sm mb-6'>Higher APY, potentially higher risk.</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-2 mb-4'>
            <div className='flex justify-between'>
              <Label htmlFor='amount-bskegld'>Deposit Amount</Label>
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
                  placeholder='Amount'
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
            <Button type='submit' className='w-full'>
              Deposit Funds
            </Button>
          </DialogFooter>

          <p className='text-sm italic mt-4 text-center'>
            No lock period, you can withdraw anytime.
          </p>

          <Divider className='mt-4' />

          <div className='my-3'>
            <div className='mb-2'>My positions</div>
            <StakedDetails onModal={true} />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StakeModal;
