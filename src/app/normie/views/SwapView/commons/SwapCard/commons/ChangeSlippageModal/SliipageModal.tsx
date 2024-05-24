import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import useDisclosure from '@/hooks/useDisclosure';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export default function SlippageModal({
  slippage,
  handleChangeSlippage
}: {
  slippage: number;
  handleChangeSlippage: (val: string) => void;
}) {
  const [newSlippage, setNewSlippage] = useState(slippage.toString());
  const { onToggle, isOpen } = useDisclosure();
  return (
    <Dialog open={isOpen} onOpenChange={onToggle}>
      <DialogTrigger asChild>
        <Button className='px-[8px] h-[26.8px] text-gray-700 text-[12px] rounded-full'>
          <FontAwesomeIcon
            icon={faSliders}
            className='w-[12px] h-[12px] mr-3'
          />
          {slippage} %
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] rounded-2xl '>
        <DialogHeader className='text-left mb-8'>
          <DialogTitle className='text-2xl font-normal'>
            Slippage Tolerance
          </DialogTitle>
        </DialogHeader>
        <div className='w-full flex justify-between sm:flex-row flex-col gap-4'>
          <div className='flex gap-2'>
            <Button
              className='px-[12px] h-[26.8px] text-gray-700  rounded-full'
              onClick={() => setNewSlippage('1')}
            >
              1 %
            </Button>

            <Button
              className='px-[12px] h-[26.8px] text-gray-700  rounded-full'
              onClick={() => setNewSlippage('3')}
            >
              3 %
            </Button>

            <Button
              className='px-[12px] h-[26.8px] text-gray-700  rounded-full'
              onClick={() => setNewSlippage('5')}
            >
              5 %
            </Button>
          </div>

          <div className='flex gap-2 items-center w-fit '>
            <span>Custom</span>
            <Input
              className='rounded-full bg-[#0b1022] w-[70px]'
              onChange={(e) => setNewSlippage(e.target.value)}
              value={newSlippage}
            />
            <span>%</span>
          </div>
        </div>

        <Button
          onClick={() => {
            handleChangeSlippage(newSlippage);
            onToggle();
          }}
        >
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
}
