'use client';
import Divider from '@/components/Divider/Divider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { arrayToCsv, copyTextToClipboard } from '@/utils/general';
import { formatAddress } from '@/utils/mx-utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { addressIsValid } from '@multiversx/sdk-dapp/utils';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const formSchema = z.object({
  wallets: z
    .string()
    .nonempty('Wallets are required')
    .refine(
      (value) => {
        const wallets = value.split(' ');
        return wallets.every(addressIsValid);
      },
      { message: 'Invalid wallets' }
    ),
  winners: z
    .number()
    .min(1, 'Number of winners is required')
    .refine(
      (value) => {
        const wallets = formSchema.shape.wallets.parse(value).split(' ');
        return value <= wallets.length;
      },
      {
        message:
          'Number of winners must be less than or equal to the number of wallets'
      }
    )
});
type FormValues = z.infer<typeof formSchema>;

export default function SelectWinners() {
  const [winners, setWinners] = useState<string[]>([]);
  const [duplicates, setDuplicates] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      wallets: '',
      winners: undefined
    }
  });

  const walletsValue = watch('wallets');

  useEffect(() => {
    const wallets = walletsValue.split(' ');
    const uniqueWallets = new Set(wallets);
    setDuplicates(uniqueWallets.size !== wallets.length);
  }, [walletsValue]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const wallets = data.wallets.split(' ');
    const winners = [];
    for (let i = 0; i < data.winners; i++) {
      const randomIndex = Math.floor(Math.random() * wallets.length);
      winners.push(wallets[randomIndex]);
      wallets.splice(randomIndex, 1);
    }
    setWinners(winners);
  };

  const clearForm = () => {
    reset();
    setWinners([]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mx-auto w-full max-w-2xl rounded-lg border border-gray-200 dark:border-gray-700'>
        <div className='p-6'>
          <div className='space-y-6'>
            <div className='space-y-1.5'>
              <Label htmlFor='wallets'>Wallets</Label>
              <Textarea
                className='min-h-[200px] border border-gray-200 dark:border-gray-700'
                id='wallets'
                placeholder='Enter a list of wallets separated by space'
                {...register('wallets')}
              />
              <div className='mt-5'>
                {errors.wallets && (
                  <div className='text-red-500 text-xs'>
                    {errors.wallets.message?.toString()}
                  </div>
                )}

                {duplicates && (
                  <div className='flex w-full justify-between items-center '>
                    <div className='text-yellow-500 text-xs'>
                      Wallets contain duplicates
                    </div>

                    <Button
                      className='text-xs'
                      size={'sm'}
                      variant='outline'
                      onClick={() => {
                        const wallets = walletsValue.split(' ');
                        const uniqueWallets = new Set(wallets);
                        setValue(
                          'wallets',
                          Array.from(uniqueWallets).join(' ')
                        );
                      }}
                    >
                      Remove duplicates
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <div className='space-y-1.5'>
              <Label htmlFor='winners'>Winners</Label>
              <Input
                id='winners'
                placeholder='Number of winners'
                type='number'
                {...register('winners', { valueAsNumber: true })}
              />
              {errors.winners && (
                <div className='text-red-500 text-xs'>
                  {errors.winners.message?.toString()}
                </div>
              )}
            </div>
            <div className='flex space-x-3'>
              <Button
                className='flex-1'
                variant='outline'
                onClick={clearForm}
                type='button'
              >
                Clear
              </Button>
              <Button className='flex-1' type='submit'>
                Select Winners
              </Button>
            </div>

            {winners.length > 0 && (
              <div className='space-y-2 mt-6'>
                <div className='w-full flex justify-between items-center'>
                  <Label>Lucky ones 🍀 : </Label>
                  <div className='flex gap-3'>
                    <Button
                      variant={'outline'}
                      size={'sm'}
                      className='rounded-full text-xs'
                      onClick={() => {
                        copyTextToClipboard(winners.join(' '));
                        toast.success('Copied to clipboard');
                      }}
                    >
                      Copy All
                    </Button>
                    <Button
                      variant={'outline'}
                      size={'sm'}
                      className='rounded-full text-xs'
                      onClick={() => {
                        arrayToCsv({
                          data: winners.map((w) => ({
                            addresses: w
                          })),
                          fileName: 'winners.csv'
                        });
                      }}
                    >
                      To Csv
                    </Button>
                  </div>
                </div>
                <Divider />
                <div className='grid grid-cols-2 gap-2'>
                  {winners.map((winner, index) => (
                    <Button
                      key={index}
                      variant={'ghost'}
                      className='w-fit'
                      onClick={() => {
                        copyTextToClipboard(winner);
                        toast.success('Copied to clipboard');
                      }}
                    >
                      <div>
                        {index + 1}. {formatAddress(winner)}
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
