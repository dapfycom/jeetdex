import useGetElrondToken from '@/hooks/useGetElrondToken';
import { useAppSelector } from '@/hooks/useRedux';
import {
  calculateSlippageAmount,
  formatBalance,
  formatBalanceDollar,
  formatTokenI
} from '@/utils/mx-utils';
import {
  selectConvertInfo,
  selectDustSlippage,
  selectToTokenDust
} from '../../../lib/dust-slice';
import { useGetAmountOut } from '../../../lib/hooks';

const ConvertInfo = () => {
  const toTokenToConvert = useAppSelector(selectToTokenDust);
  const { elrondToken: token } = useGetElrondToken(toTokenToConvert);
  const selectedTokens = useAppSelector(selectConvertInfo);
  const { data, isLoading } = useGetAmountOut(selectedTokens);
  const slipage = useAppSelector(selectDustSlippage);

  const receiveAmount = calculateSlippageAmount(
    slipage,
    data?.amountOut || 0
  ).toString();
  return (
    <div className='bg-[#0b102280] rounded-sm'>
      <div className='mt-4 pb-4'>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className='flex flex-col gap-3'>
            <div className='flex flex-col mb-3 text-center'>
              <p>
                You will receive{' '}
                {formatBalance({
                  balance: receiveAmount,
                  decimals: token?.decimals
                })}{' '}
                {formatTokenI(toTokenToConvert)}
              </p>
              <div className='flex flex-col'>
                <p className='text-muted-foreground text-sm'>
                  ≈ $
                  {formatBalanceDollar(
                    {
                      balance: receiveAmount,
                      decimals: token?.decimals
                    },
                    token?.ticker === 'USDC' ? 1 : token?.price
                  )}
                </p>
              </div>
            </div>
            {/* <div className="flex justify-between mb-3">
              <p>Basic protocol fee:</p>
              <p>{formatTokenI(toTokenToConvert) === "BSK" ? "0%" : "3.5%"} </p>
            </div> */}

            {/* <div className="flex justify-between">
              <p>Slipage</p>
              <div className="flex gap-3">
                <SlipageBox percent={1} selected={slipage === 1} />
                <SlipageBox percent={2} selected={slipage === 2} />
                <SlipageBox percent={3} selected={slipage === 3} />
                <SlipageBox percent={5} selected={slipage === 5} />
              </div>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConvertInfo;
