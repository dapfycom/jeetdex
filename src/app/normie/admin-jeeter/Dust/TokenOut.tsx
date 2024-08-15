'use client';
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
import { interactions } from '@/services/sc/interactions';
import { TokenIdentifierValue } from '@multiversx/sdk-core/out';
import { useForm } from 'react-hook-form';

const TokenOut = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      tokenIdentifier: ''
    }
  });

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission logic here

    interactions.dust.scCall({
      functionName: 'setOutputToken',

      arg: [new TokenIdentifierValue(data.tokenIdentifier)],
      gasL: 100_000_000
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>For Token Out</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className='grid gap-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='tokenIdentifier'>Token Identifier</Label>
              <Input
                id='tokenIdentifier'
                {...register('tokenIdentifier', {
                  required: 'This field is required'
                })}
                placeholder='Enter token identifier'
              />
              {errors.tokenIdentifier && (
                <span className='text-red-500'>
                  {errors.tokenIdentifier.message}
                </span>
              )}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type='submit' onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TokenOut;
