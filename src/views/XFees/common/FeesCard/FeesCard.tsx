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
import { formatAddress, formatBalanceDollar } from '@/utils/mx-utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useGetXFees } from '../../lib/hooks';

const formSchema = z.object({
  address: z
    .string()
    .nonempty('Address is required')
    .regex(/^(erd1)[0-9a-z]{58}$/, 'Invalid address')
});

type FormValues = z.infer<typeof formSchema>;

const FeesCard = () => {
  const [feesAddress, setFeesAddress] = useState('');
  const userAddress = useAppSelector(selectUserAddress);
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlAddress = searchParams.get('address');
  const [price] = useGetTokenPrice(tokensID.egld);
  const { isOpen, onToggle } = useDisclosure(false);

  const { xfees, isLoading } = useGetXFees(feesAddress);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: feesAddress
    }
  });

  useEffect(() => {
    if (urlAddress) {
      setFeesAddress(urlAddress);
      setValue('address', urlAddress);
    }
  }, [urlAddress, setValue]);

  useEffect(() => {
    if (!urlAddress) {
      router.push(routeNames.xfees + '?address=' + userAddress);
    }
  }, [router, urlAddress, userAddress]);

  const onSubmit = (values: FormValues) => {
    console.log('submit', values);
    router.push(routeNames.xfees + '?address=' + values.address);
  };

  return (
    <div className='w-full'>
      <Card className='max-w-[450px] mx-auto'>
        <CardHeader>
          <CardTitle>Address : {formatAddress(feesAddress)}</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <p>
                Fees:{' '}
                <span className='text-green-500'> {xfees?.xfees} EGLD</span>
              </p>
              <p>
                Dollar amount:{' '}
                <span className='text-green-500'>
                  {formatBalanceDollar(
                    {
                      balance: xfees?.xfees || 0,
                      decimals: 0
                    },
                    price
                  )}{' '}
                  USD
                </span>
              </p>
              <p>
                Transactions:{' '}
                <span className='text-green-500'>{xfees?.transactions}</span>
              </p>
            </>
          )}
        </CardContent>
        <Collapse isOpen={isOpen}>
          <CardFooter>
            <div className='flex flex-col gap-2'>
              <p className='text-muted-foreground text-sm'>
                You are allowed to change the fee wallet without connecting it
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
                  router.push(routeNames.xfees + '?address=' + userAddress)
                }
                variant={'secondary'}
                disabled={userAddress === feesAddress}
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

export default FeesCard;
