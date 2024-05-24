import {
  IAllPairsContractMetadata,
  IPairContractData,
  ISCAllPairsContractMetadata,
  ISCPairContractData
} from '@/types/routerTypes';

export const adaptAllPairsContractMetadata = (
  metadata: ISCAllPairsContractMetadata
): IAllPairsContractMetadata[] => {
  return metadata.items.map((item) => {
    const firstTokenId = item.fields[0].value.value;
    const secondTokenId = item.fields[1].value.value;
    const address = item.fields[2].value.value.bech32;
    return { firstTokenId, secondTokenId, address };
  });
};

export const adaptAllPairsContractData = (
  data: ISCPairContractData
): IPairContractData[] => {
  return data.items.map((item) => {
    const address = item.fields[0].value.value.bech32;
    const firstTokenId = item.fields[1].value.value;
    const secondTokenId = item.fields[2].value.value;
    const firstTokenReserve = item.fields[3].value.value;
    const secondTokenReserve = item.fields[4].value.value;
    const ownerFeePercentage = item.fields[5].value.value;
    const buyFeePercentage = item.fields[6].value.value;
    const sellFeePercentage = item.fields[7].value.value;
    const buyFeeFinishTimestamp = item.fields[8].value.value;
    const sellFeeFinishTimestamp = item.fields[9].value.value;
    const lpTokenIdentifier = item.fields[10].value.value;
    const lpTokenSupply = item.fields[11].value.value;
    return {
      address,
      firstTokenId,
      secondTokenId,
      firstTokenReserve,
      secondTokenReserve,
      ownerFeePercentage,
      buyFeePercentage,
      sellFeePercentage,
      buyFeeFinishTimestamp,
      sellFeeFinishTimestamp,
      lpTokenIdentifier,
      lpTokenSupply
    };
  });
};
