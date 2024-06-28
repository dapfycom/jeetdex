import { IPoolPair } from '@/app/normie/views/PoolsView/utils/types';
import { SmartContractConfigTypes } from '@/services/sc';
import BigNumber from 'bignumber.js';
import { numberWithCommas, preventExponetialNotation } from './numbers';

export const formatAddress = (
  address: string,
  subStr1: number = 10,
  subStr2: number = 6
): string => {
  const addr = address || '';
  return (
    addr.substring(0, subStr1) +
    ' ... ' +
    addr.substring(addr.length - subStr2, addr.length)
  );
};

export const shortenHash = (address: string, charsAmount = 6) => {
  const firstPart = address.substring(0, charsAmount);
  const lastPart = address.substring(
    address.length - charsAmount,
    address.length
  );
  return `${firstPart}...${lastPart}`;
};

export const formatBalance = (
  token: { balance: string | number | BigNumber; decimals?: number },
  retrunNumber = false,
  customPrecision?: number,
  withDots?: boolean
) => {
  if (token) {
    const strBalance = token.balance;
    const formatedBalance = getRealBalance(strBalance, token.decimals);

    const finalBinance = formatPrecision(
      formatedBalance as number,
      customPrecision
    );

    if (retrunNumber) {
      return finalBinance;
    }

    const withoutExponential = preventExponetialNotation(finalBinance);
    if (withDots) {
      return numberWithCommas(withoutExponential, true);
    } else {
      return numberWithCommas(withoutExponential);
    }
  }
};
export const formatBalanceDollar = (
  token: { balance: string | number; decimals?: number },
  price: number,
  toString?: boolean
) => {
  if (token && token.balance) {
    const strBalance = token.balance;

    const intBalance = Number(strBalance);
    const intBalanceDolar = intBalance * Number(price);
    const formatedBalance = getRealBalance(intBalanceDolar, token.decimals);
    const finalBinance = formatPrecision(formatedBalance as number);
    const withoutExponential = preventExponetialNotation(finalBinance);

    if (toString) {
      return numberWithCommas(withoutExponential);
    }
    return finalBinance;
  }
  return 0;
};

export const getRealBalance = (
  balance1: BigNumber | string | number = 0,
  decimal?: number,
  returnBigNumber: boolean = false
) => {
  const divider = Math.pow(10, decimal ?? 18);
  const balance = new BigNumber(balance1);
  const real = balance.dividedBy(divider, 10);

  if (returnBigNumber) {
    return real;
  }
  return real.toNumber();
};

export const formatPrecision = (num: number, customPrecision?: number) => {
  if (!num) {
    return 0;
  }
  let precision = customPrecision ?? 2;
  if (!customPrecision && customPrecision !== 0) {
    if (num < 1) {
      if (num < 0.009) {
        if (num < 0.0000001) {
          if (num < 0.000000001) {
            if (num < 0.00000000001) {
              precision = 18;
            } else {
              precision = 16;
            }
          } else {
            precision = 11;
          }
        } else {
          precision = 6;
        }
      } else {
        precision = 4;
      }
    }
    if (num === 1) {
      precision = 1;
    }
    if (num > 1) {
      precision = 2;
    }
  }

  const exp = Math.pow(10, precision);

  return parseInt(String(num * exp), 10) / exp;
};

export const formatNumber = (number?: number | string) => {
  if (!number && number !== 0) {
    return null;
  }
  return numberWithCommas(formatPrecision(Number(number)));
};

export const setElrondBalance = (
  amount: BigNumber.Value,
  decimals: BigNumber.Value = 18
): string => {
  if (!amount) return '0';
  try {
    const elrondBalance = new BigNumber(amount).multipliedBy(
      new BigNumber(10).pow(decimals)
    );
    const noDecimalsElrondBalance = new BigNumber(elrondBalance).toFixed(0);

    return noDecimalsElrondBalance;
  } catch (err) {
    return '0';
  }
};

export const formatTokenI = (tokenIdentifier: string): string => {
  if (!tokenIdentifier) {
    return '';
  }

  return tokenIdentifier.split('-')[0];
};

// slipapge is % number like 1% or 5%
export const calculateSlippageAmount = (
  slipapge: number,
  aproxAmount: string | number | BigNumber
): BigNumber => {
  const amountWithSlipage = new BigNumber(aproxAmount)
    .multipliedBy(slipapge)
    .dividedBy(100);

  const finalAmount = new BigNumber(aproxAmount).minus(amountWithSlipage);

  return finalAmount;
};

export const get_token_amount_for_given_position = (
  liquidity: BigNumber.Value,
  tokenI: string,
  pair: IPoolPair
): BigNumber => {
  const reserve =
    pair.firstTokenId === tokenI
      ? pair.firstTokenReserve
      : pair.secondTokenReserve;
  const total_supply = new BigNumber(pair.lpTokenSupply);
  if (!total_supply.isZero()) {
    const amount = new BigNumber(liquidity)
      .multipliedBy(reserve)
      .dividedBy(total_supply);
    return amount;
  } else {
    return total_supply;
  }
};

export const get_both_tokens_for_given_position = (
  liquidity: string,
  pair: IPoolPair
): {
  firstTokenAmount: string;
  secondTokenAmount: string;
} => {
  const first_token_id = pair.firstTokenId;
  const token_first_token_amount = get_token_amount_for_given_position(
    liquidity,
    first_token_id,
    pair
  );
  const second_token_id = pair.secondTokenId;
  const token_second_token_amount = get_token_amount_for_given_position(
    liquidity,
    second_token_id,
    pair
  );

  return {
    firstTokenAmount: token_first_token_amount.toString(),
    secondTokenAmount: token_second_token_amount.toString()
  };
};

export const getWspOfWrapedEgld = (shard: number): SmartContractConfigTypes => {
  switch (shard) {
    case 0:
      return 'wrapEGLDShard0';
    case 1:
      return 'wrapEGLDShard1';
    case 2:
      return 'wrapEGLDShard2';

    default:
      return 'wrapEGLDShard1';
  }
};
