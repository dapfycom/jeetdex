import { TokenImageSRC } from '@/components/TokenImage/TokenImage';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from '@/components/ui/select';
import { getRealBalance } from '@/utils/mx-utils';
import { formatBigNumber } from '@/utils/numbers';
import { errorToast } from '@/utils/toast';
import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from '../ChooseToken';
import { ITokenPool } from './PoolItemContainer';
interface TokenItemProps {
  tokensList: ITokenPool[];
  tokenType: 'firstToken';
}

const PoolItem = ({ tokensList, tokenType }: TokenItemProps) => {
  const { setValue } = useFormContext<z.infer<typeof formSchema>>();
  const [currentPoolItem, setCurrentPoolItem] = useState<ITokenPool | null>(
    tokensList[0]
  );

  useEffect(() => {
    console.log(tokensList);

    if (tokensList.length > 0) {
      setCurrentPoolItem(tokensList[0]);

      setValue(tokenType, tokensList[0].identifier);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue, tokenType, tokensList.length]);

  return (
    <Select
      onValueChange={(val) => {
        const token = tokensList.find((t) => t.identifier === val);
        if (token) {
          setCurrentPoolItem(token);
          setValue(tokenType, token.identifier);
        } else {
          errorToast("This token doesn't exist");
        }
      }}
      defaultValue={tokensList[0].identifier}
    >
      <SelectTrigger className='bg-[#1C243E]'>
        <TokenBox token={currentPoolItem} noBalance />
      </SelectTrigger>
      <SelectContent>
        <div className='w-[350px] flex flex-col gap-2'>
          {tokensList.map((token) => (
            <SelectItem
              value={token.identifier}
              key={token.identifier}
              className='bg-zinc-800 rounded-md w-full flex justify-between items-center cursor-pointer '
              onClick={() => {
                setCurrentPoolItem(token);
                console.log(token);

                setValue(tokenType, token.identifier);
              }}
            >
              <div className='flex gap-3 items-center w-full'>
                <TokenImageSRC
                  src={token?.imgUrl}
                  alt='logo'
                  size={20}
                  className='rounded-full w-5 h-5'
                  identifier={token.identifier}
                />
                <h3 className='text-sm'>{token.identifier}</h3>
                <span className='text-gray-400 flex items-center'>
                  <span className='whitespace-nowrap'>Balance : </span>
                  {token.balance && (
                    <div>
                      <p className='text-xs ml-2'>
                        {formatBigNumber(
                          BigNumber(
                            getRealBalance(token.balance, token.decimals, true)
                          )
                        )}
                      </p>
                    </div>
                  )}
                </span>
              </div>
            </SelectItem>
          ))}
        </div>
      </SelectContent>
    </Select>
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
    <div className='rounded-md w-full flex justify-between items-center '>
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
