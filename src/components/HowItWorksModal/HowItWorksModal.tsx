'use client';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import useDisclosure from '@/hooks/useDisclosure';
import { getCookie, setCookie } from 'cookies-next';
import { useEffect } from 'react';
import { Button } from '../ui/button';

const HowItWorksModal = () => {
  const { isOpen, onToggle, onOpen } = useDisclosure();

  useEffect(() => {
    const howItWorksCookie = getCookie('how-it-works');

    if (howItWorksCookie !== 'true') {
      onOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        onToggle();
        if (!open) {
          setCookie('how-it-works', 'true');
        }
      }}
    >
      <DialogTrigger>
        {' '}
        <span className='hover:font-bold'>[how it works]</span>
      </DialogTrigger>
      <DialogContent className='w-full max-w-md'>
        <DialogHeader>
          <DialogTitle>How it works?</DialogTitle>
          <DialogDescription>
            <div className='flex flex-col mt-3'>
              <div>
                🙅‍♀️ <span className='ml-2'> no code required</span>
              </div>
              <div>
                🙅 <span className='ml-2'> no gatekeeping</span>
              </div>
              <div>
                🙅‍♂️ <span className='ml-2'>no waiting for permission</span>{' '}
              </div>
              <div className='my-2'>you only have to: </div>

              <div className='flex flex-col mb-3'>
                <div>✅ connect your wallet</div>

                <div>✅ start new coin</div>

                <div>✅ share it with the world</div>

                <div>✅ have fun</div>

                <div className='my-2'>
                  simple, fast, secure – and inexpensive
                </div>
              </div>
              <DialogClose asChild>
                <Button>i’m ready to play</Button>
              </DialogClose>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default HowItWorksModal;
