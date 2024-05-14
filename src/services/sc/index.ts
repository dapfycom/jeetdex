import routerAbi from '@/assets/abis/router.abi.json';
import { scAddress } from '@/config';
import { Address } from '@multiversx/sdk-core/out';
import { SmartContractInteraction } from './call';

export const smartContractsConfig = {
  wrapEGLDShard0: {
    simpleAddress: scAddress.wrapEGLDShard0,
    address: new Address(scAddress.wrapEGLDShard0),
    abi: null
  },
  wrapEGLDShard1: {
    simpleAddress: scAddress.wrapEGLDShard1,
    address: new Address(scAddress.wrapEGLDShard1),
    abi: null
  },
  wrapEGLDShard2: {
    simpleAddress: scAddress.wrapEGLDShard2,
    address: new Address(scAddress.wrapEGLDShard2),
    abi: null
  },

  mainRouter: {
    simpleAddress: scAddress.mainRouter,
    address: new Address(scAddress.mainRouter),
    abi: routerAbi
  }
};

export type SmartContractConfigTypes = keyof typeof smartContractsConfig;

export const interactions: {
  [key in SmartContractConfigTypes]: SmartContractInteraction;
} = {
  wrapEGLDShard0: new SmartContractInteraction(
    smartContractsConfig.wrapEGLDShard0.simpleAddress
  ),
  wrapEGLDShard1: new SmartContractInteraction(
    smartContractsConfig.wrapEGLDShard1.simpleAddress
  ),
  wrapEGLDShard2: new SmartContractInteraction(
    smartContractsConfig.wrapEGLDShard2.simpleAddress
  ),
  mainRouter: new SmartContractInteraction(
    smartContractsConfig.mainRouter.simpleAddress
  )
};
