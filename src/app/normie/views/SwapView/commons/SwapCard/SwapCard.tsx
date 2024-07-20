import { Card, CardContent, CardFooter } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { IElrondAccountToken, IElrondToken } from '@/types/scTypes';
import { formatBalanceDollar } from '@/utils/mx-utils';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Toolbar from '../Toolbar/Toolbar';
import InputBox from './commons/InputBox';
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
  handleChangeToField: (value: string) => void;
  handleChangeToToken: (value: IElrondToken) => void;
  pairSelected: { firstToken: string; secondToken: string; address: string };
  swapFields: () => void;
  toFieldElrondToken: IElrondToken;

  tokensSuggested: {
    allTokens: IElrondToken[];
    jeedexTokens: IElrondToken[];
    ashTokens: { id: string; decimals: number }[];
  };
}

const SwapCard = ({
  fromField,
  handleChangeFromField,

  toField,
  handleChangeFromToken,
  handleClear,
  handlePercentAmount: handleMax,
  isLoading,

  handleChangeToField,
  handleChangeToToken,
  pairSelected,
  swapFields: swapFileds,
  toFieldElrondToken,
  tokensSuggested
}: IProps) => {
  return (
    <div className='w-full  max-w-[500px] mx-auto'>
      <Toolbar pairSelected={pairSelected} />
      <Card className='p-0 text-left rounded-sm bg-[#1C243E] border-none '>
        <CardContent className='p-3'>
          <InputBox
            selectedTokenI={fromField.selectedToken}
            value={fromField.value}
            onChange={handleChangeFromField}
            onChangeToken={handleChangeFromToken}
            isLoadingInput={isLoading}
            handlePercentAmount={handleMax}
            clear={handleClear}
            tokensIdentifiers={tokensSuggested.allTokens.map(
              (t) => t.identifier
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
                variant={'ghost'}
                onClick={swapFileds}
                className='group  flex justify-center items-center '
              >
                <FontAwesomeIcon icon={faSync} />
              </Button>
            </div>
          </div>

          <InputBox
            selectedTokenI={toField.selectedToken}
            value={toField.value}
            onChange={handleChangeToField}
            onChangeToken={handleChangeToToken}
            isLoadingInput={isLoading}
            tokensIdentifiers={tokensSuggested.allTokens.map(
              (t) => t.identifier
            )}
            label='To'
            hideAmountButtons
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
