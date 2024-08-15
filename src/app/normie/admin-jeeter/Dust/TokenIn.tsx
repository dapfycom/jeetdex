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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { interactions } from '@/services/sc/interactions';
import {
  Address,
  AddressType,
  AddressValue,
  BooleanType,
  BooleanValue,
  Field,
  FieldDefinition,
  Struct,
  StructType,
  TokenIdentifierType,
  TokenIdentifierValue
} from '@multiversx/sdk-core/out';
import { useForm } from 'react-hook-form';

const TokenIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      tokenIdentifier: '',
      poolAddress: '',
      platform: '',
      firstToken: '',
      secondToken: ''
    }
  });

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission logic here

    interactions.dust.scCall({
      functionName: 'addRoutes',

      arg: [
        new TokenIdentifierValue(data.tokenIdentifier),
        new Struct(
          new StructType('Route', [
            new FieldDefinition('address', '', new AddressType()),
            new FieldDefinition(
              'pair_type',
              'Maiar or OneDex',
              new BooleanType()
            ),
            new FieldDefinition(
              'first_token_id',
              'First token of the pool',
              new TokenIdentifierType()
            ),
            new FieldDefinition(
              'second_token_id',
              'Second token of the pool',
              new TokenIdentifierType()
            )
          ]),
          [
            new Field(
              new AddressValue(Address.fromBech32(data.poolAddress)),
              'address'
            ),
            new Field(
              new BooleanValue(data.platform === 'onedex'),
              'pair_type'
            ),
            new Field(
              new TokenIdentifierValue(data.firstToken),
              'first_token_id'
            ),
            new Field(
              new TokenIdentifierValue(data.secondToken),
              'second_token_id'
            )
          ]
        )
      ],
      gasL: 100_000_000
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>For Token in</CardTitle>
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
            <div className='space-y-2'>
              <Label htmlFor='poolAddress'>Pool Address</Label>
              <Input
                id='poolAddress'
                {...register('poolAddress', {
                  required: 'This field is required'
                })}
                placeholder='Enter pool address'
              />
              {errors.poolAddress && (
                <span className='text-red-500'>
                  {errors.poolAddress.message}
                </span>
              )}
            </div>
          </div>
          <div className='space-y-2'>
            <Label>Platform</Label>
            <div className='flex items-center gap-4'>
              <RadioGroup>
                <RadioGroupItem
                  id='maiar'
                  value='maiar'
                  {...register('platform')}
                />
                <Label htmlFor='maiar' className='text-sm font-medium'>
                  Maiar
                </Label>
              </RadioGroup>
              <RadioGroup>
                <RadioGroupItem
                  id='onedex'
                  value='onedex'
                  {...register('platform')}
                />
                <Label htmlFor='onedex' className='text-sm font-medium'>
                  Onedex
                </Label>
              </RadioGroup>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='firstToken'>First Token Identifier</Label>
              <Input
                id='firstToken'
                {...register('firstToken', {
                  required: 'This field is required'
                })}
                placeholder='Enter first token identifier'
              />
              {errors.firstToken && (
                <span className='text-red-500'>
                  {errors.firstToken.message}
                </span>
              )}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='secondToken'>Second Token Identifier</Label>
              <Input
                id='secondToken'
                {...register('secondToken', {
                  required: 'This field is required'
                })}
                placeholder='Enter second token identifier'
              />
              {errors.secondToken && (
                <span className='text-red-500'>
                  {errors.secondToken.message}
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

export default TokenIn;
