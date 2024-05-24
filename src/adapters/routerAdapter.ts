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
  data: ISCPairContractData[]
): IPairContractData[] => {
  return data.map((item) => {
    const address = item.sc_address.bech32();
    const firstTokenId = item.first_token_id;
    const secondTokenId = item.second_token_id;
    const firstTokenReserve = item.first_token_reserve.toString();
    const secondTokenReserve = item.second_token_reserve.toString();
    const ownerFeePercentage = item.owner_fee_percent.toNumber();
    const buyFeePercentage = item.buy_fee_percent.toNumber();
    const sellFeePercentage = item.sell_fee_percent.toNumber();
    const buyFeeFinishTimestamp = item.buy_fee_finish_timestamp.toNumber();
    const sellFeeFinishTimestamp = item.sell_fee_finish_timestamp.toNumber();
    const lpTokenIdentifier = item.lp_token_identifier;
    const lpTokenSupply = item.lp_token_supply.toString();

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
