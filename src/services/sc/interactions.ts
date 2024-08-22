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
  ),
  dust: new SmartContractInteraction(
    smartContractsConfig.dust.simpleAddress,
    smartContractsConfig.dust.abi
  ),
  metachain: new SmartContractInteraction(
    smartContractsConfig.metachain.simpleAddress
  ),
  degenMaster: new SmartContractInteraction(
    smartContractsConfig.degenMaster.simpleAddress
  ),
  ashSwapAggregator: new SmartContractInteraction(
    smartContractsConfig.ashSwapAggregator.simpleAddress,
    smartContractsConfig.ashSwapAggregator.abi
  ),
  bskFarm: new SmartContractInteraction(
    smartContractsConfig.bskFarm.simpleAddress,
    smartContractsConfig.bskFarm.abi
  ),
  oneDexFarm: new SmartContractInteraction(
    smartContractsConfig.oneDexFarm.simpleAddress,
    smartContractsConfig.oneDexFarm.abi
  ),
  hatomParent: new SmartContractInteraction(
    smartContractsConfig.hatomParent.simpleAddress,
    smartContractsConfig.hatomParent.abi
  ),
  ashSwapFarm: new SmartContractInteraction(
    smartContractsConfig.ashSwapFarm.simpleAddress,
    smartContractsConfig.ashSwapFarm.abi
  )
};
