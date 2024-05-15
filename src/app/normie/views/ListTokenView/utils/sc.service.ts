import { interactions } from '@/services/sc';
import { SmartContractInteraction } from '@/services/sc/call';
import { Address, AddressValue, BytesValue } from '@multiversx/sdk-core/out';
import { pairContractAbi } from './constants';

export const newPoolTx = async (
  first_token_id: string,
  second_token_id: string
) => {
  return interactions.mainRouter.scCall({
    functionName: 'newPair',
    arg: [
      BytesValue.fromUTF8(first_token_id),
      BytesValue.fromUTF8(second_token_id)
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

  interactions.MultiESDTNFTTransfer({
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
