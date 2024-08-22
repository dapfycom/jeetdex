import Divider from '@/components/Divider/Divider';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { PointerIcon } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { tokensID } from '@/config';
import useGetAccountToken from '@/hooks/useGetAccountToken';
import { formatBalance, formatTokenI, getRealBalance } from '@/utils/mx-utils';
import { stake } from '@/views/FarmView/commons/FarmOneDex/utils/services';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { OneDexFarmContext } from '../../FarmOneDex';
import StakedDetails from '../StakedInfo/StakedDetails/StakedDetails';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const StakeModal = ({ isOpen, onClose }: IProps) => {
  const { farm } = useContext(OneDexFarmContext);
  const { accountToken: userStakedToken } = useGetAccountToken(tokensID.egld);
  const [maxAmount, setMaxAmount] = useState<number>(0);

  const stakeSchema = z.object({
    amount: z
      .number()
      .min(1, 'Amount must be greater than 1 EGLD')
      .max(maxAmount, 'Amount must be less than balance')
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

  const onSubmit = (data: StakeFormData) => {
    if (farm?.farm_click_id) {
      stake(data.amount.toString(), farm.farm_click_id);
    }
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

  if (!farm) return null;

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
                  placeholder='$0.00'
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
            <Button
              type='submit'
              className='bg-[#ff9900] text-white px-4 py-2 rounded-md flex items-center justify-center space-x-2 w-full'
            >
              <PointerIcon className='text-white h-6 w-6' />
              <span>Deposit now with 1-Click®</span>
            </Button>
          </DialogFooter>

          <p
            className='text-sm italic mt-4'
            style={{
              textAlign: 'center'
            }}
          >
            No lock period, you can withdraw anytime.
          </p>

          <Divider className='mt-4' />
          <div className='my-3'>
            <div className='mb-2'>My positions</div>

            <StakedDetails onModal />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StakeModal;
