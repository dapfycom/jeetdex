'use client';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { IElrondAccountToken, IElrondToken } from '@/types/scTypes';
import { formatBalanceDollar } from '@/utils/mx-utils';
import {
  faArrowDown,
  faArrowDownUpAcrossLine
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SlippageModal from './commons/ChangeSlippageModal/SliipageModal';
import InputBox from './commons/InputBox';
import SubmitButton from './commons/SubmitButton';

interface IProps {
  slippage: number;
  handleChangeSlippage: (value: string) => void;
  fromField: {
    value: string;
    selectedToken: string;
    valueDecimals: string;
  };
  toField: {
    value: string;
    selectedToken: string;
    valueDecimals: string;
  };
  handleChangeFromField: (value: string) => void;
  handleChangeFromToken: (value: IElrondToken) => void;
  isLoading: boolean;
  handleMax: (val: IElrondAccountToken) => void;
  handleClear: () => void;
  tokensPairs: { firstToken: string; secondToken: string; address: string }[];
  normalDirection: boolean;
  handleChangeToField: (value: string) => void;
  handleChangeToToken: (value: IElrondToken) => void;
  secondTokensForFirstToken: any[];
  pairSelected: { firstToken: string; secondToken: string; address: string };
  swapFileds: () => void;
  toFieldElrondToken: IElrondToken;
}

const SwapCard = ({
  fromField,
  handleChangeFromField,
  handleChangeSlippage,
  slippage,
  toField,
  handleChangeFromToken,
  handleClear,
  handleMax,
  isLoading,
  normalDirection,
  tokensPairs,
  handleChangeToField,
  handleChangeToToken,
  pairSelected,
  secondTokensForFirstToken,
  swapFileds,
  toFieldElrondToken
}: IProps) => {
  return (
    <div className='w-full  max-w-[500px] mx-auto'>
      <div className='w-full flex justify-end mb-3'>
        <SlippageModal
          slippage={slippage}
          handleChangeSlippage={handleChangeSlippage}
        />
      </div>
      <Card className='lg:p-3 p-0  pt-6 text-left rounded-3xl bg-[#1C243E] border-none shadow-[0px_8px_24px_rgba(79,_83,_243,_0.12)]'>
        <CardContent>
          <InputBox
            selectedTokenI={fromField.selectedToken}
            value={fromField.value}
            onChange={handleChangeFromField}
            onChangeToken={handleChangeFromToken}
            isLoadingInput={isLoading}
            onMax={handleMax}
            clear={handleClear}
            tokensIdentifiers={tokensPairs.map((t) =>
              normalDirection ? t.firstToken : t.secondToken
            )}
            label='From'
            dollarValue={
              toFieldElrondToken
                ? (formatBalanceDollar(
                    {
                      balance: toField.valueDecimals,
                      decimals: toFieldElrondToken.decimals
                    },
                    toFieldElrondToken.price
                  ) as string)
                : '0'
            }
          />

          <div className='flex justify-center my-6'>
            <div className=''>
              <Button
                size={'icon'}
                variant={'ghost'}
                onClick={swapFileds}
                className='group w-10 h-10 rounded-full flex justify-center pxitems-center text-[#0B1022] hover:text-[#0B1022]  bg-[#8CA7E8] hover:shadow hover:bg-[#8CA7E8]'
              >
                <div className='group-hover:hidden '>
                  <FontAwesomeIcon
                    icon={faArrowDown}
                    className='h-[18px] w-[18px] '
                  />
                </div>
                <div className='group-hover:block hidden'>
                  <FontAwesomeIcon
                    icon={faArrowDownUpAcrossLine}
                    className='h-[18px] w-[18px] '
                  />
                </div>
              </Button>
            </div>
          </div>

          <InputBox
            selectedTokenI={toField.selectedToken}
            value={toField.value}
            onChange={handleChangeToField}
            onChangeToken={handleChangeToToken}
            isLoadingInput={isLoading}
            tokensIdentifiers={Array.from(
              new Set([...secondTokensForFirstToken])
            )}
            label='To'
          />
        </CardContent>
        <CardFooter>
          <SubmitButton poolAddres={pairSelected?.address} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default SwapCard;
