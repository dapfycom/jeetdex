import TokenImage from '@/components/TokenImage/TokenImage';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { tokensID } from '@/config';
import useGetElrondToken from '@/hooks/useGetElrondToken';
import { formatBalance, setElrondBalance } from '@/utils/mx-utils';
import { useGetStakeBskUserInfo } from '@/views/FarmView/utils/hooks';
import { unstakeBsk } from '@/views/FarmView/utils/services';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Loader } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const WithdrawModal = ({ isOpen, onClose }: IProps) => {
  const { data } = useGetStakeBskUserInfo();
  const { elrondToken: stakedToken, isLoading } = useGetElrondToken(
    tokensID.bsk
  );
  const [maxAmount, setMaxAmount] = useState<number>(0);

  const stakeSchema = z.object({
    amount: z
      .number()
      .min(0, 'Negative number')
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
    onClose();
    unstakeBsk(
      setElrondBalance(values.amount.toString(), stakedToken.decimals)
    );
  };

  const handleMax = () => {
    const value = formatBalance(
      { balance: data.staked || 0, decimals: stakedToken.decimals },
      true,
      18
    ) as number;
    setMaxAmount(value);
    setValue('amount', value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='w-full sm:max-w-[500px]'>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>
                {' '}
                <div className='flex items-center gap-3'>
                  <TokenImage src={stakedToken?.assets.svgUrl} size={32} />
                  <h3>Unstake BSK</h3>
                </div>
              </DialogTitle>
            </DialogHeader>
            <div className='flex items-center gap-2 px-3 py-2 bg-secondary rounded-md'>
              <AlertCircle className='h-4 w-4' />
              <p className='text-sm flex-1'>
                {' '}
                Can&apos;t leave less than 1,000,000 BSK on staking
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='flex flex-col gap-2'>
                <Controller
                  name='amount'
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id='amount-bsk'
                      placeholder='Amount'
                      type='number'
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                      value={field.value || ''}
                    />
                  )}
                />

                <div className='flex justify-between mt-3 text-xs mb-2'>
                  {errors.amount && (
                    <p className='text-red-700'>{errors.amount.message}</p>
                  )}
                  <p className='cursor-pointer' onClick={handleMax}>
                    Balance:{' '}
                    {formatBalance({
                      balance: data.staked || 0,
                      decimals: stakedToken.decimals
                    })}
                  </p>
                </div>
              </div>

              <DialogFooter>
                <div className='flex-col flex w-full'>
                  <Button className='w-full' type='submit'>
                    Unstake
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WithdrawModal;
