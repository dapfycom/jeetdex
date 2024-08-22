import { LpTokenImageV2 } from '@/components/LpTokenImage/LpTokenImage';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import useGetAccountToken from '@/hooks/useGetAccountToken';

import { stake } from '@/views/FarmView/commons/FarmAshSwap/utils/services';

import { tokensID } from '@/config';
import { formatBalance, formatTokenI, getRealBalance } from '@/utils/mx-utils';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AshFarmContext } from '../../FarmAshSwap';
interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const StakeModal = ({ isOpen, onClose }: IProps) => {
  const { farm } = useContext(AshFarmContext);
  const { accountToken: userStakedToken } = useGetAccountToken(tokensID.egld);

  const form = useForm({
    defaultValues: {
      amount: ''
    }
  });

  const handleSubmit = (values: any) => {
    const amount = values.amount;
    if (farm?.farm_click_id) {
      stake(amount, farm.farm_click_id);
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
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {' '}
            <div className='flex items-center gap-3'>
              <LpTokenImageV2 lpToken={userStakedToken} size={25} />
              <h3>
                Stake in {formatTokenI(farm.first_token_id)}-
                {formatTokenI(farm.second_token_id)} farm
              </h3>
            </div>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className='flex flex-col gap-2'>
            {/* <Label htmlFor="amount-bskegld">BSK-EGLD Amount</Label> */}
            <Input
              id='amount-bskegld'
              name='amount'
              placeholder='Amount'
              type='number'
              {...form.register('amount')}
            />
            <div className='flex justify-between mt-3 text-xs mb-2'>
              <p className='text-red-700'>
                {form.formState.errors.amount?.message}
              </p>
              <p className='cursor-pointer' onClick={handleMax}>
                Balance: {formatBalance(userStakedToken)} EGLD
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button type='submit'>Stake</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StakeModal;
