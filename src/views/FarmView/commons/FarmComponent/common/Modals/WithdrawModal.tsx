import Divider from '@/components/Divider/Divider';
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
import { tokensID } from '@/config';
import useGetElrondToken from '@/hooks/useGetElrondToken';
import { formatBalance } from '@/utils/mx-utils';
import {
  useGetFarmUserInfo,
  useLpStoped,
  useNFTsStoped
} from '@/views/FarmView/utils/hooks';
import { stop, withdraw } from '@/views/FarmView/utils/services';
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
  const { data: userFarmInfo } = useGetFarmUserInfo();
  const { elrondToken: stakedToken, isLoading } = useGetElrondToken(
    tokensID.bskwegld
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

  const onSubmit = (data: StakeFormData) => {
    onClose();
    stop(data.amount.toString(), []);
  };

  const handleMax = () => {
    const value = formatBalance(
      { balance: userFarmInfo?.lpActive || 0, decimals: stakedToken.decimals },
      true,
      18
    ) as number;
    setMaxAmount(value);
    setValue('amount', value);
  };

  const { isLpStoped } = useLpStoped();
  const { isNFTsStoped } = useNFTsStoped();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='w-full sm:max-w-[500px]'>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>
                <div className='flex items-center gap-3'>
                  <LpTokenImageV2 lpToken={stakedToken} size={25} />
                  <h3>Withdraw in BSK-EGLD farm</h3>
                </div>
              </DialogTitle>
            </DialogHeader>

            <div className='flex items-center gap-2 px-3 py-2 bg-secondary rounded-md'>
              <AlertCircle className='h-4 w-4' />
              <p className='text-sm flex-1'>
                Please note that your LP tokens or NFTs will be available to
                claim in 48 hours after unstaking.
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
                      id='amount-bskegld'
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
                      balance: userFarmInfo?.lpActive || 0,
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
                  <Divider className='my-4' />

                  <div className='flex flex-col'>
                    <p className='text-sm mb-1 text-muted-foreground'>
                      Available to unstake: {userFarmInfo?.nftActive.length}{' '}
                      NFTs
                    </p>
                    <Button
                      className='w-full'
                      onClick={() => {
                        if (userFarmInfo) {
                          onClose();
                          stop(
                            '0',
                            userFarmInfo.nftActive.map((nft) => {
                              const nonce = nft.split('-')[2];
                              return parseInt(nonce, 16);
                            })
                          );
                        }
                      }}
                    >
                      Unstake NFTs
                    </Button>
                  </div>

                  <Divider className='my-4' />

                  <div className='flex flex-col'>
                    <p className='text-sm mb-1 text-muted-foreground'>
                      {isLpStoped ? 'Locked ' : 'Available to claim'}:{' '}
                      {formatBalance({
                        balance: userFarmInfo?.lpStopped || 0,
                        decimals: stakedToken.decimals
                      })}{' '}
                      LP {`and ${userFarmInfo?.nftStopped.length} NFTs`}
                    </p>
                    <Button
                      className='w-full'
                      onClick={() => {
                        onClose();
                        withdraw();
                      }}
                      disabled={isLpStoped && isNFTsStoped}
                    >
                      Claim
                    </Button>
                  </div>
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
