import { pairContractAbi } from '@/localConstants/globals';
import { interactions } from '@/services/sc';
import { SmartContractInteraction } from '@/services/sc/call';
import {
  Address,
  AddressValue,
  BytesValue,
  Field,
  FieldDefinition,
  OptionType,
  OptionalValue,
  Struct,
  StructType,
  U64Type,
  U64Value
} from '@multiversx/sdk-core/out';

export const newPoolTx = async (
  first_token_id: string,
  second_token_id: string,
  buyFee?: {
    value?: string;
    timestamp?: number;
  },
  sellFee?: {
    value?: string;
    timestamp?: number;
  }
) => {
  const pairFeeType = new StructType('PairFee', [
    new FieldDefinition('fee', '', new U64Type()),
    new FieldDefinition('finish_timestamp', '', new U64Type())
  ]);
  return interactions.mainRouter.scCall({
    functionName: 'newPair',
    arg: [
      BytesValue.fromUTF8(first_token_id),
      BytesValue.fromUTF8(second_token_id),
      new OptionalValue(
        new OptionType(pairFeeType),
        new Struct(pairFeeType, [
          new Field(new U64Value(Number(buyFee.value) * 100), 'fee'),
          new Field(new U64Value(buyFee.timestamp), 'finish_timestamp')
        ])
      ),
      new OptionalValue(
        new OptionType(pairFeeType),
        new Struct(pairFeeType, [
          new Field(new U64Value(Number(sellFee.value) * 100), 'fee'),
          new Field(new U64Value(sellFee.timestamp), 'finish_timestamp')
        ])
      )
    ]
  });
};

export const createLp = async (
  poolAddress: string,
  lpName: string,
  lpTicker: string
) => {
  return interactions.mainRouter.EGLDPayment({
    value: 0.05,
    functionName: 'issueLpToken',
    arg: [
      new AddressValue(Address.fromBech32(poolAddress)),
      BytesValue.fromUTF8(lpName),
      BytesValue.fromUTF8(lpTicker)
    ],
    gasL: 150_000_000
  });
};

export const setRoles = async (poolAddress: string) => {
  return interactions.mainRouter.scCall({
    functionName: 'setLocalRoles',
    arg: [new AddressValue(Address.fromBech32(poolAddress))],
    gasL: 100_000_000
  });
};

export const addInitialLiquidity = async (
  poolAddress: string,
  token1: { identifier: string; value: number; decimals: number },
  token2: { identifier: string; value: number; decimals: number }
) => {
  const interactions = new SmartContractInteraction(
    poolAddress,
    pairContractAbi
  );

  return interactions.MultiESDTNFTTransfer({
    functionName: 'addInitialLiquidity',
    tokens: [
      {
        collection: token1.identifier,
        nonce: 0,
        value: token1.value,
        decimals: token1.decimals
      },
      {
        collection: token2.identifier,
        nonce: 0,
        value: token2.value,
        decimals: token2.decimals
      }
    ]
  });
};

export const enableTrade = async (poolAddress: string) => {
  return interactions.mainRouter.scCall({
    functionName: 'enablePair',
    arg: [new AddressValue(Address.fromBech32(poolAddress))],
    gasL: 100_000_000
  });
};
