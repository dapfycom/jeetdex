import { SmartContractConfigTypes, smartContractsConfig } from '.';
import { SmartContractInteraction } from './call';

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
    smartContractsConfig.mainRouter.simpleAddress,
    smartContractsConfig.mainRouter.abi
  )
};
