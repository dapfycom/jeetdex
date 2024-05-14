import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import useDisclosure from '@/hooks/useDisclosure';
import { getRealBalance } from '@/utils/mx-utils';
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
                {token?.imgUrl ? (
                  <Image
                    src={token?.imgUrl}
                    alt='logo'
                    width={24}
                    height={24}
                    className='rounded-full'
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faQuestionCircle}
                    className='w-6 h-6'
                  />
                )}

                <h3 className='text-sm'>{token.identifier}</h3>
              </div>
              {token.balance && (
                <div>
                  <p className='text-xs'>
                    {BigNumber(
                      getRealBalance(token.balance, token.decimals, true)
                    ).toString()}
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
    <div className='bg-zinc-800 p-3 rounded-md w-full flex justify-between items-center'>
      <div className='flex gap-3 items-center'>
        {token.imgUrl ? (
          <Image
            src={token.imgUrl}
            alt='logo'
            width={24}
            height={24}
            className='rounded-full'
          />
        ) : (
          <FontAwesomeIcon icon={faQuestionCircle} className='w-6 h-6' />
        )}

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
