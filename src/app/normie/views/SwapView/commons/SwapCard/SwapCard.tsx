'use client';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { IElrondAccountToken, IElrondToken } from '@/types/scTypes';
import { formatBalanceDollar } from '@/utils/mx-utils';
import {
  faArrowDown,
  faArrowDownUpAcrossLine,
  faChartColumn,
  faMessage
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSwapContext } from '../../SwapContext';
import SlippageModal from './commons/ChangeSlippageModal/SliipageModal';
import InputBox from './commons/InputBox';
import MoreOptions from './commons/MoreOptions/MoreOptions';
import SubmitButton from './commons/SubmitButton';

interface IProps {
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
  handlePercentAmount: (val: IElrondAccountToken, percent: number) => void;
  handleClear: () => void;
  tokensPairs: { firstToken: string; secondToken: string; address: string }[];
  normalDirection: boolean;
  handleChangeToField: (value: string) => void;
  handleChangeToToken: (value: IElrondToken) => void;
  secondTokensForFirstToken: any[];
  pairSelected: { firstToken: string; secondToken: string; address: string };
  swapFields: () => void;
  toFieldElrondToken: IElrondToken;
}

const SwapCard = ({
  fromField,
  handleChangeFromField,

  toField,
  handleChangeFromToken,
  handleClear,
  handlePercentAmount: handleMax,
  isLoading,
  normalDirection,
  tokensPairs,
  handleChangeToField,
  handleChangeToToken,
  pairSelected,
  secondTokensForFirstToken,
  swapFields: swapFileds,
  toFieldElrondToken
}: IProps) => {
  const swapCxt = useSwapContext();
  return (
    <div className='w-full  max-w-[500px] mx-auto'>
      <div className='w-full flex justify-end mb-3 gap-3'>
        <Button
          className='px-[8px] h-[26.8px] text-gray-700 text-[12px] rounded-full'
          onClick={swapCxt.OnToggleCharts}
          size='icon'
        >
          <FontAwesomeIcon icon={faChartColumn} className='w-[12px] h-[12px]' />
        </Button>
        <Button
          className='px-[8px] h-[26.8px] text-gray-700 text-[12px] rounded-full'
          onClick={swapCxt.onToggleChats}
          size='icon'
        >
          <FontAwesomeIcon icon={faMessage} className='w-[12px] h-[12px]' />
        </Button>
        <SlippageModal />
        <MoreOptions />
      </div>
      <Card className='p-0 text-left rounded-3xl bg-[#1C243E] border-none shadow-[0px_8px_24px_rgba(79,_83,_243,_0.12)]'>
        <CardContent>
          <InputBox
            selectedTokenI={fromField.selectedToken}
            value={fromField.value}
            onChange={handleChangeFromField}
            onChangeToken={handleChangeFromToken}
            isLoadingInput={isLoading}
            handlePercentAmount={handleMax}
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

          <div className='flex justify-center my-2'>
            <div className=''>
              <Button
                size={'icon'}
                variant={'ghost'}
                onClick={swapFileds}
                className='group w-7 h-7 rounded-full flex justify-center pxitems-center text-[#0B1022] hover:text-[#0B1022]  bg-[#8CA7E8] hover:shadow hover:bg-[#8CA7E8]'
              >
                <div className='group-hover:hidden '>
                  <FontAwesomeIcon
                    icon={faArrowDown}
                    className='h-[16px] w-[16px] '
                  />
                </div>
                <div className='group-hover:block hidden'>
                  <FontAwesomeIcon
                    icon={faArrowDownUpAcrossLine}
                    className='h-[16px] w-[16px] '
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
