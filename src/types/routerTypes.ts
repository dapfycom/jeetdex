import { Address } from '@multiversx/sdk-core/out';
import BigNumber from 'bignumber.js';
import { ISCResponseQueryType } from './scTypes';

// getAllPairContractMetadata
export interface ISCAllPairsContractMetadata {
  items: {
    fields: {
      name: string;
      value: {
        type: { name: string; typeParameters: any[] };
        value: any;
      };
    }[];
    fieldByName: object;
    type: ISCResponseQueryType;
  }[];
  type: ISCResponseQueryType;
}

export interface IAllPairsContractMetadata {
  firstTokenId: string;
  secondTokenId: string;
  address: string;
}

// getAllPairContractData
export interface ISCPairContractData {
  sc_address: Address;
  first_token_id: string;
  second_token_id: string;
  first_token_reserve: BigNumber;
  second_token_reserve: BigNumber;
  owner_fee_percent: BigNumber;
  buy_fee_percent: BigNumber;
  sell_fee_percent: BigNumber;
  buy_fee_finish_timestamp: BigNumber;
  sell_fee_finish_timestamp: BigNumber;
  lp_token_identifier: string;
  lp_token_supply: BigNumber;
}

export interface IPairContractData {
  address: string;
  firstTokenId: string;
  secondTokenId: string;
  firstTokenReserve: string;
  secondTokenReserve: string;
  ownerFeePercentage: number;
  buyFeePercentage: number;
  sellFeePercentage: number;
  buyFeeFinishTimestamp: number;
  sellFeeFinishTimestamp: number;
  lpTokenIdentifier: string;
  lpTokenSupply: string;
}
