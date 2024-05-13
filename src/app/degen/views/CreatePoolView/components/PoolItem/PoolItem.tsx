import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import useDisclosure from '@/hooks/useDisclosure';
import { IElrondAccountToken } from '@/types/scTypes';
import { getRealBalance } from '@/utils/mx-utils';
import BigNumber from 'bignumber.js';
import { useState } from 'react';
interface TokenItemProps {
  tokensList: IElrondAccountToken[];
  onChangePoolItem?: (token: IElrondAccountToken) => void;
}

const PoolItem = ({ tokensList, onChangePoolItem }: TokenItemProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [currentPoolItem, setCurrentPoolItem] =
    useState<IElrondAccountToken | null>(tokensList[0]);

  return (
    <Popover
      open={isOpen}
      onOpenChange={(open) => (open ? onOpen() : onClose())}
    >
      <PopoverTrigger>
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
                onChangePoolItem(token);
                onClose();
              }}
            >
              <div className='flex gap-3 items-center'>
                {token.assets?.svgUrl ? (
                  <Image
                    src={token.assets.svgUrl}
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
              <div>
                <p className='text-xs'>
                  {BigNumber(
                    getRealBalance(token.balance, token.decimals, true)
                  ).toString()}
                </p>
              </div>
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
  token: IElrondAccountToken;
  noBalance?: boolean;
}) => {
  return (
    <div className='bg-zinc-800 p-3 rounded-md w-full flex justify-between items-center'>
      <div className='flex gap-3 items-center'>
        {token.assets?.svgUrl ? (
          <Image
            src={token.assets.svgUrl}
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
