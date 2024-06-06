import { TokenImageSRC } from '@/components/TokenImage/TokenImage';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import useDisclosure from '@/hooks/useDisclosure';
import { getRealBalance } from '@/utils/mx-utils';
import { formatBigNumber } from '@/utils/numbers';
import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from '../CreatePoolForm';
import { ITokenPool } from './PoolItemContainer';

interface TokenItemProps {
  tokensList: ITokenPool[];
  tokenType: 'firstToken' | 'secondToken';
}

const PoolItem = ({ tokensList, tokenType }: TokenItemProps) => {
  const { setValue } = useFormContext<z.infer<typeof formSchema>>();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [currentPoolItem, setCurrentPoolItem] = useState<ITokenPool | null>(
    tokensList[0]
  );

  useEffect(() => {
    if (tokensList.length > 0) {
      setCurrentPoolItem(tokensList[0]);

      setValue(tokenType, tokensList[0].identifier);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue, tokenType, tokensList.length]);

  return (
    <Popover
      open={isOpen}
      onOpenChange={(open) => (open ? onOpen() : onClose())}
    >
      <PopoverTrigger className='w-full'>
        <TokenBox token={currentPoolItem} noBalance />
      </PopoverTrigger>
      <PopoverContent className='w-full bg-zinc-400 p-3'>
        <div className='w-[350px] flex flex-col gap-2'>
          {tokensList.map((token) => (
            <div
              key={token.identifier}
              className='bg-zinc-800 p-3 rounded-md w-full flex justify-between items-center cursor-pointer '
              onClick={() => {
                setCurrentPoolItem(token);
                setValue(tokenType, token.identifier);
                onClose();
              }}
            >
              <div className='flex gap-3 items-center'>
                <TokenImageSRC
                  src={token?.imgUrl}
                  alt='logo'
                  size={20}
                  className='rounded-full w-5 h-5'
                  identifier={token.identifier}
                />

                <h3 className='text-sm'>{token.identifier}</h3>
              </div>
              {token.balance && (
                <div>
                  <p className='text-xs'>
                    {formatBigNumber(
                      BigNumber(
                        getRealBalance(token.balance, token.decimals, true)
                      )
                    )}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PoolItem;

const TokenBox = ({
  token,
  noBalance
}: {
  token: ITokenPool;
  noBalance?: boolean;
}) => {
  return (
    <div className='bg-[#1C243E]  p-3 rounded-md w-full flex justify-between items-center '>
      <div className='flex gap-3 items-center'>
        <TokenImageSRC
          src={token?.imgUrl}
          alt='logo'
          size={20}
          className='rounded-full w-5 h-5'
          identifier={token.identifier}
        />

        <h3 className='text-sm'>{token.identifier}</h3>
      </div>
      {!noBalance && (
        <div>
          <p className='text-xs'>
            {BigNumber(
              getRealBalance(token.balance, token.decimals, true)
            ).toString()}
          </p>
        </div>
      )}
    </div>
  );
};
