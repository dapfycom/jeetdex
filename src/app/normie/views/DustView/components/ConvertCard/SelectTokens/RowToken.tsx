import { Checkbox } from '@/components/ui/checkbox';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { IElrondAccountToken } from '@/types/scTypes';

import { TokenImageSRC } from '@/components/TokenImage/TokenImage';
import { formatBalanceDollar, formatTokenI } from '@/utils/mx-utils';
import { HTMLProps } from 'react';
import { maxAllowedTokensCount } from '../../../lib/contants';
import { selectConvertInfo, selectOutputToken } from '../../../lib/dust-slice';

interface IProps extends HTMLProps<HTMLDivElement> {
  token: IElrondAccountToken;
  checked: boolean;
}
const RowToken = ({ token, checked, ...rest }: IProps) => {
  const dispatch = useAppDispatch();
  const selectedTokens = useAppSelector(selectConvertInfo);

  const handleSelect = (isCheked: boolean) => {
    if (selectedTokens.length <= maxAllowedTokensCount) {
      dispatch(
        selectOutputToken({
          data: token,
          isCheked: isCheked
        })
      );
    }
  };

  const disbleTokenSelection =
    selectedTokens.length >= maxAllowedTokensCount &&
    !Boolean(selectedTokens.find((t) => t.identifier === token.identifier));
  console.log(token?.assets?.svgUrl);

  return (
    <div
      className='items-top flex flex-col space-x-2 items-center gap-3 cursor-pointer border p-3 justify-start'
      {...rest}
    >
      <Checkbox
        id={token.identifier}
        onCheckedChange={(e) => handleSelect(e as boolean)}
        disabled={disbleTokenSelection}
        checked={checked}
      />
      <div className='flex gap-1.5 leading-none w-full cursor-pointer'>
        <label
          htmlFor={token.identifier}
          className='w-full text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
        >
          <div className='flex flex-col gap-1'>
            <div className='flex gap-3 items-center w-full'>
              <div className='rounded-full w-[28px] md:w-[28px] h-[28px] md:h-[28px]'>
                <TokenImageSRC
                  alt={token.ticker}
                  src={token?.assets?.svgUrl}
                  size={28}
                  identifier={token.identifier}
                  className='rounded-full w-[28px] h-[28px]'
                />
              </div>

              <p className='text-center'>{formatTokenI(token.identifier)}</p>
            </div>

            <div className='whitespace-nowrap flex justify-center text-muted-foreground text-sm'>
              ≈ ${formatBalanceDollar(token, token?.price || 0)}
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default RowToken;
