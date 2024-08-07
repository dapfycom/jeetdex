import { TokenImageSRC } from '@/components/TokenImage/TokenImage';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { egldStaticData } from '@/localConstants/tokensStaticsData';
import { formatBalance } from '@/utils/mx-utils';
import { useState } from 'react';

const BuyDialog = ({
  isOpen,
  onClose,
  tokenName,
  fee,
  onCreateCoin
}: {
  tokenName: string;
  isOpen: boolean;
  onClose: () => void;
  fee: string;
  onCreateCoin: (amount: string) => void;
}) => {
  const [amount, setAmount] = useState('');

  const handleConfirm = () => {
    onCreateCoin(amount);
    onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className='text-center'>
          <DialogTitle className='text-center mb-4'>
            Choose how many [{tokenName}] you want to buy (optional)
          </DialogTitle>
          <DialogDescription className='text-center text-gray-100'>
            tip: its optional buying a small amount of coins helps protect your
            coin from snipers
          </DialogDescription>
        </DialogHeader>

        <div className='flex justify-between items-center border border-white px-3 pr-5 rounded-md gap-3'>
          <input
            className='bg-transparent outline-none w-full py-1'
            placeholder='0.0 (optional)'
            onChange={(e) => setAmount(e.target.value)}
          />

          <div className='flex gap-2 items-center'>
            <span>EGLD</span>
            <TokenImageSRC
              src={egldStaticData.assets.svgUrl}
              alt={'Egld coin'}
              identifier={'EGLD'}
              size={20}
            />
          </div>
        </div>

        <Button onClick={handleConfirm}>Create coin</Button>

        <p className='text-center text-sm'>
          Cost to deploy ~
          {formatBalance({
            balance: fee,
            decimals: 18
          })}{' '}
          EGLD
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default BuyDialog;
