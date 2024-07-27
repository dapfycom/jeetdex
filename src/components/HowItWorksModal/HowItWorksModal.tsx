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
          setCookie('how-it-works', 'true', {
            maxAge: 100 * 365 * 24 * 60 * 60
          });
        }
      }}
    >
      <DialogTrigger>
        {' '}
        <span className='hover:font-bold'>[how it works]</span>
      </DialogTrigger>
      <DialogContent className='w-full max-w-md p-8'>
        <DialogHeader>
          <DialogTitle className='text-center text-sm'>
            We prevent rugs by making sure that all created tokens are safe.
            Each coin is a fair-launch with no presale and no team allocation.
          </DialogTitle>
          <DialogDescription>
            <div className='flex flex-col mt-3 text-left gap-2'>
              <div>
                <span className='font-bold'>step 1:</span> create new coin
              </div>
              <div>
                <span className='font-bold'>step 2:</span> users buy your coin
                on the bonding curve
              </div>
              <div>
                <span className='font-bold'>step 3:</span> users can sell at any
                time to lock in profits or losses
              </div>
              <div>
                <span className='font-bold'>step 4:</span> when enough people
                buy on the bonding curve and it reaches a market cap of $23,000
              </div>
              <div>
                <span className='font-bold'>step 5:</span> $4,000 of liquidity
                is then deposited in jeetdex and burned
              </div>

              <DialogClose asChild>
                <Button className='mt-8'>i’m ready to jeet</Button>
              </DialogClose>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default HowItWorksModal;
