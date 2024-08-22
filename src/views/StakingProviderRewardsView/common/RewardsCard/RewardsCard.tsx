import Collapse from '@/components/Collapse/Collapse';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { routeNames, tokensID } from '@/config';
import useDisclosure from '@/hooks/useDisclosure';
import useGetTokenPrice from '@/hooks/useGetTokenPrice';
import { useAppSelector } from '@/hooks/useRedux';
import { selectUserAddress } from '@/redux/dapp/dapp-slice';
import {
  formatAddress,
  formatBalance,
  formatBalanceDollar
} from '@/utils/mx-utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useGetXStakingRewards } from '../../lib/hooks';

const formSchema = z.object({
  address: z
    .string()
    .nonempty('Address is required')
    .regex(/^(erd1)[0-9a-z]{58}$/, 'Invalid address')
});

type FormValues = z.infer<typeof formSchema>;

const RewardsCard = () => {
  const [stkRewardsAddress, setFeesAddress] = useState('');
  const userAddress = useAppSelector(selectUserAddress);
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlAddress = searchParams.get('address');
  const [price] = useGetTokenPrice(tokensID.egld);
  const { isOpen, onToggle } = useDisclosure(false);

  const { rewards, transactions, isLoading } =
    useGetXStakingRewards(stkRewardsAddress);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: ''
    }
  });

  useEffect(() => {
    if (urlAddress) {
      setFeesAddress(urlAddress);
      reset({ address: urlAddress });
    }
  }, [urlAddress, reset]);

  useEffect(() => {
    if (!urlAddress) {
      router.push(routeNames.xstkRewards + '?address=' + userAddress);
    }
  }, [router, urlAddress, userAddress]);

  const onSubmit = (values: FormValues) => {
    console.log('submit', values);
    router.push(routeNames.xstkRewards + '?address=' + values.address);
  };

  return (
    <div className='w-full'>
      <Card className='max-w-[450px] mx-auto'>
        <CardHeader>
          <CardTitle>Address : {formatAddress(stkRewardsAddress)}</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <p>
                Rewards:{' '}
                <span className='text-green-500'>
                  {' '}
                  {formatBalance({
                    balance: rewards,
                    decimals: 18
                  })}{' '}
                  EGLD
                </span>
              </p>
              <p>
                Dollar amount :{' '}
                <span className='text-green-500'>
                  {' '}
                  {formatBalanceDollar(
                    {
                      balance: rewards || 0,
                      decimals: 18
                    },
                    price
                  )}{' '}
                  USD
                </span>
              </p>
              <p>
                Transactions:{' '}
                <span className='text-green-500'>{transactions}</span>
              </p>
            </>
          )}
        </CardContent>
        <Collapse isOpen={isOpen}>
          <CardFooter>
            <div className='flex flex-col gap-2'>
              <p className='text-muted-foreground text-sm'>
                You are allowed to change the fee wallet without connecting
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col space-y-2'>
                  <Label htmlFor='address'>Other address</Label>
                  <Input
                    id='address'
                    placeholder='erd...'
                    {...register('address')}
                  />
                  {errors.address && (
                    <p className='text-red-700'>{errors.address.message}</p>
                  )}

                  <Button type='submit' size={'sm'} disabled={isSubmitting}>
                    Change wallet
                  </Button>
                </div>
              </form>

              <Button
                className='mt-5'
                onClick={() =>
                  router.push(
                    routeNames.xstkRewards + '?address=' + userAddress
                  )
                }
                variant={'secondary'}
                disabled={userAddress === stkRewardsAddress}
              >
                Use my wallet
              </Button>
            </div>
          </CardFooter>
        </Collapse>

        <div className='flex justify-center mb-4'>
          <Button variant={'outline'} size={'sm'} onClick={onToggle}>
            Show {isOpen ? 'Less' : 'More'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default RewardsCard;
