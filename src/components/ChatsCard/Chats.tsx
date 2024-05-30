'use client';
import { useSwapContext } from '@/app/normie/views/SwapView/SwapContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

export default function Chats() {
  const swapCtx = useSwapContext();

  if (!swapCtx.isOPenChats) {
    return null;
  }

  return (
    <div className='relative'>
      <div className=' flex flex-col  w-full lg:p-3 p-0  pt-6 text-left rounded-3xl bg-[#1C243E] border-none shadow-[0px_8px_24px_rgba(79,_83,_243,_0.12)]'>
        <div className='flex-1 w-full flex flex-col gap-4 px-4 py-8'>
          <div className='flex items-start gap-3'>
            <Avatar className='border w-6 h-6'>
              <AvatarImage alt='User 1' src='/assets/img/logo-jeeter.png' />
              <AvatarFallback>U1</AvatarFallback>
            </Avatar>
            <div className='grid gap-1'>
              <div className='flex items-center gap-2'>
                <div className='text-sm text-muted-foreground'>cesarx</div>
                <Button
                  className='w-4 h-4 hover:bg-transparent text-stone-400 hover:text-stone-900'
                  size='icon'
                  variant='ghost'
                >
                  <HeartIcon className='w-4 h-4' />
                  <span className='sr-only'>Like</span>
                </Button>
                <Button
                  className='w-4 h-4 hover:bg-transparent text-stone-400 hover:text-stone-900'
                  size='icon'
                  variant='ghost'
                >
                  <MessageCircleIcon className='w-4 h-4' />
                  <span className='sr-only'>Reply</span>
                </Button>
              </div>
              <div className='prose prose-sm prose-stone'>
                <p>Hey, hows it going?</p>
              </div>
            </div>
          </div>
          <div className='flex items-start gap-3'>
            <Avatar className='border w-6 h-6'>
              <AvatarImage alt='User 2' src='/assets/img/logo-jeeter.png' />
              <AvatarFallback>U2</AvatarFallback>
            </Avatar>
            <div className='grid gap-1'>
              <div className='flex items-center gap-2'>
                <div className='text-sm text-muted-foreground'>lobby</div>
                <Button
                  className='w-4 h-4 hover:bg-transparent text-stone-400 hover:text-stone-900'
                  size='icon'
                  variant='ghost'
                >
                  <HeartIcon className='w-4 h-4' />
                  <span className='sr-only'>Like</span>
                </Button>
                <Button
                  className='w-4 h-4 hover:bg-transparent text-stone-400 hover:text-stone-900'
                  size='icon'
                  variant='ghost'
                >
                  <MessageCircleIcon className='w-4 h-4' />
                  <span className='sr-only'>Reply</span>
                </Button>
              </div>
              <div className='prose prose-sm prose-stone'>
                <p>Pretty good, just chatting with the team.</p>
              </div>
            </div>
          </div>
          <div className='flex items-start gap-3'>
            <Avatar className='border w-6 h-6'>
              <AvatarImage alt='User 1' src='/assets/img/logo-jeeter.png' />
              <AvatarFallback>U1</AvatarFallback>
            </Avatar>
            <div className='grid gap-1'>
              <div className='flex items-center gap-2'>
                <div className='text-sm text-muted-foreground'>javi</div>
                <Button
                  className='w-4 h-4 hover:bg-transparent text-stone-400 hover:text-stone-900'
                  size='icon'
                  variant='ghost'
                >
                  <HeartIcon className='w-4 h-4' />
                  <span className='sr-only'>Like</span>
                </Button>
                <Button
                  className='w-4 h-4 hover:bg-transparent text-stone-400 hover:text-stone-900'
                  size='icon'
                  variant='ghost'
                >
                  <MessageCircleIcon className='w-4 h-4' />
                  <span className='sr-only'>Reply</span>
                </Button>
              </div>
              <div className='prose prose-sm prose-stone'>
                <p>Awesome, let me know if you need anything!</p>
              </div>
            </div>
          </div>
          <div className='flex items-start gap-3'>
            <Avatar className='border w-6 h-6'>
              <AvatarImage alt='User 3' src='/assets/img/logo-jeeter.png' />
              <AvatarFallback>U3</AvatarFallback>
            </Avatar>
            <div className='grid gap-1'>
              <div className='flex items-center gap-2'>
                <div className='text-sm text-muted-foreground'>lopz</div>
                <Button
                  className='w-4 h-4 hover:bg-transparent text-stone-400 hover:text-stone-900'
                  size='icon'
                  variant='ghost'
                >
                  <HeartIcon className='w-4 h-4' />
                  <span className='sr-only'>Like</span>
                </Button>
                <Button
                  className='w-4 h-4 hover:bg-transparent text-stone-400 hover:text-stone-900'
                  size='icon'
                  variant='ghost'
                >
                  <MessageCircleIcon className='w-4 h-4' />
                  <span className='sr-only'>Reply</span>
                </Button>
              </div>
              <div className='prose prose-sm prose-stone'>
                <p>Hey guys, Im here too!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className='absolute top-3 right-3 w-8 h-8'
            size='icon'
            type='button'
          >
            <PlusIcon className='w-4 h-4' />
            <span className='sr-only'>Open Message Input</span>
          </Button>
        </DialogTrigger>
        <DialogContent className='p-4 sm:max-w-md'>
          <div className='flex flex-col gap-4'>
            <div className='space-y-2'>
              <DialogTitle>Send a Message</DialogTitle>
              <DialogDescription>
                Type your message in the input below and click send.
              </DialogDescription>
            </div>
            <div className='relative'>
              <Textarea
                className='min-h-[96px] rounded-2xl resize-none p-4 border border-gray-200 shadow-sm pr-16 dark:border-gray-800'
                id='message'
                name='message'
                placeholder='Type your message...'
                rows={3}
              />
              <Button
                className='absolute top-3 right-3 w-8 h-8'
                size='icon'
                type='submit'
              >
                <ArrowUpIcon className='w-4 h-4' />
                <span className='sr-only'>Send</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ArrowUpIcon(props) {
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
      <path d='m5 12 7-7 7 7' />
      <path d='M12 19V5' />
    </svg>
  );
}

function HeartIcon(props) {
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
      <path d='M19 14c1.49-1.46 3-3.21 3-6.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z' />
    </svg>
  );
}

function MessageCircleIcon(props) {
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
      <path d='M7.9 20A9 9 0 1 0 4 16.1L2 22Z' />
    </svg>
  );
}

function PlusIcon(props) {
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
      <path d='M5 12h14' />
      <path d='M12 5v14' />
    </svg>
  );
}
