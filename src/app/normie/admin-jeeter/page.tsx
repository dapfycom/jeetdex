'use client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
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
import Link from 'next/link';
import { useForm } from 'react-hook-form';

export default function Component() {
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
    <div className='flex min-h-screen w-full flex-col bg-muted/40'>
      <aside className='fixed inset-y-0 left-0 z-10 flex h-full w-14 flex-col border-r bg-background sm:w-60'>
        <div className='flex h-16 items-center justify-between border-b px-4 sm:px-6'>
          <Link
            href='#'
            className='flex items-center gap-2 text-lg font-semibold sm:text-base'
            prefetch={false}
          >
            <FrameIcon className='h-6 w-6' />
            <span className='sr-only'>Acme Inc</span>
          </Link>
          <Button
            size='icon'
            variant='ghost'
            className='rounded-full sm:hidden'
          >
            <MenuIcon className='h-5 w-5' />
            <span className='sr-only'>Toggle menu</span>
          </Button>
        </div>
        <nav className='flex flex-1 flex-col gap-4 overflow-auto px-4 py-6 sm:px-6'>
          <Link
            href='#'
            className='flex items-center gap-4 rounded-md bg-primary px-3 py-2 text-primary-foreground transition-colors hover:bg-primary/80'
            prefetch={false}
          >
            <DropletIcon className='h-5 w-5' />
            <span className='text-sm font-medium'>Dust</span>
          </Link>
          <Link
            href='#'
            className='flex items-center gap-4 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground'
            prefetch={false}
          >
            <ShuffleIcon className='h-5 w-5' />
            <span className='text-sm font-medium'>Swap</span>
          </Link>
          <Link
            href='#'
            className='flex items-center gap-4 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground'
            prefetch={false}
          >
            <CurrencyIcon className='h-5 w-5' />
            <span className='text-sm font-medium'>Liquidity</span>
          </Link>
          <Link
            href='#'
            className='flex items-center gap-4 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground'
            prefetch={false}
          >
            <StickerIcon className='h-5 w-5' />
            <span className='text-sm font-medium'>Staking</span>
          </Link>
          <Link
            href='#'
            className='flex items-center gap-4 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground'
            prefetch={false}
          >
            <InfoIcon className='h-5 w-5' />
            <span className='text-sm font-medium'>Analytics</span>
          </Link>
        </nav>
      </aside>
      <div className='flex flex-1 flex-col'>
        <header className='sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6'>
          <div className='flex items-center gap-4'>
            <Button
              size='icon'
              variant='ghost'
              className='rounded-full sm:hidden'
            >
              <MenuIcon className='h-5 w-5' />
              <span className='sr-only'>Toggle menu</span>
            </Button>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href='/admin-jeeter'>Admin</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dust</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className='flex items-center gap-4'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon' className='rounded-full'>
                  <img
                    src='/placeholder.svg'
                    alt='Avatar'
                    width={32}
                    height={32}
                    className='rounded-full'
                    style={{ aspectRatio: '32/32', objectFit: 'cover' }}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className='flex-1 p-4 sm:p-6'>
          <div className='mx-auto max-w-4xl'>
            <Card>
              <CardHeader>
                <CardTitle>Dust</CardTitle>
                <CardDescription>
                  Manage your token dust and optimize your portfolio.
                </CardDescription>
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
                      <Label htmlFor='secondToken'>
                        Second Token Identifier
                      </Label>
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
          </div>
        </main>
      </div>
    </div>
  );
}

function CurrencyIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='12' cy='12' r='8' />
      <line x1='3' x2='6' y1='3' y2='6' />
      <line x1='21' x2='18' y1='3' y2='6' />
      <line x1='3' x2='6' y1='21' y2='18' />
      <line x1='21' x2='18' y1='21' y2='18' />
    </svg>
  );
}

function DropletIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z' />
    </svg>
  );
}

function FrameIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <line x1='22' x2='2' y1='6' y2='6' />
      <line x1='22' x2='2' y1='18' y2='18' />
      <line x1='6' x2='6' y1='2' y2='22' />
      <line x1='18' x2='18' y1='2' y2='22' />
    </svg>
  );
}

function InfoIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='12' cy='12' r='10' />
      <path d='M12 16v-4' />
      <path d='M12 8h.01' />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <line x1='4' x2='20' y1='12' y2='12' />
      <line x1='4' x2='20' y1='6' y2='6' />
      <line x1='4' x2='20' y1='18' y2='18' />
    </svg>
  );
}

function ShuffleIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22' />
      <path d='m18 2 4 4-4 4' />
      <path d='M2 6h1.9c1.5 0 2.9.9 3.6 2.2' />
      <path d='M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8' />
      <path d='m18 14 4 4-4 4' />
    </svg>
  );
}

function StickerIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z' />
      <path d='M14 3v4a2 2 0 0 0 2 2h4' />
      <path d='M8 13h0' />
      <path d='M16 13h0' />
      <path d='M10 16s.8 1 2 1c1.3 0 2-1 2-1' />
    </svg>
  );
}
