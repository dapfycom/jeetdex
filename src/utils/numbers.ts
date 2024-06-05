import BigNumber from 'bignumber.js';

export function numberWithCommas(x: string | number, decimals = false) {
  const number = Number(x);
  if (number < 1) {
    return x;
  }

  if (decimals) {
    return parseFloat(number.toString()).toLocaleString('el-GR');
  } else {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}

export function preventExponetialNotation(x: any) {
  return ('' + +x).replace(
    /(-?)(\d*)\.?(\d*)e([+-]\d+)/,
    function (a, b, c, d, e) {
      return e < 0
        ? b + '0.' + Array(1 - e - c.length).join('0') + c + d
        : b + c + d + Array(e - d.length + 1).join('0');
    }
  );
}

export const validatePercent = (value: string | number): boolean => {
  const number = Number(value);
  if (number < 0 || number > 100) {
    return false;
  }
  return true;
};

export function calculatePercentage(
  total: BigNumber,
  value: BigNumber
): BigNumber {
  if (total.isZero()) {
    throw new Error('Total must not be zero to avoid division by zero.');
  }
  return value.dividedBy(total).multipliedBy(100);
}

export function hexToBigNumber(hexString: string): bigint {
  // Remove any leading '0x' if present
  if (hexString.startsWith('0x')) {
    hexString = hexString.slice(2);
  }

  // Convert the hex string to a BigInt
  const bigNumber = BigInt('0x' + hexString);

  return bigNumber;
}
