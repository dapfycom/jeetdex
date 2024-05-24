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
