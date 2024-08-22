import aggregatorAbi from '@/assets/abis/ashswap-aggregator.abi.json';
import bskFarmAbi from '@/assets/abis/beskar-dao.abi.json';
import dustAbi from '@/assets/abis/dust_sc.abi.json';
import onDexFarmAbi from '@/assets/abis/farm_onedex.abi.json';
import ashSwapFarmAbi from '@/assets/abis/farmclick_ashswap.abi.json';
import hatomParentAbi from '@/assets/abis/hatom_parent.abi.json';
import degenMasterAbi from '@/assets/abis/master.abi.json';
import routerAbi from '@/assets/abis/router.abi.json';
import { scAddress } from '@/config';
import { Address } from '@multiversx/sdk-core/out';
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
  },
  dust: {
    simpleAddress: scAddress.dust,
    address: new Address(scAddress.dust),
    abi: dustAbi
  },
  metachain: {
    simpleAddress: scAddress.metachain,
    address: new Address(scAddress.metachain),
    abi: null
  },
  degenMaster: {
    simpleAddress: scAddress.degenMaster,
    address: new Address(scAddress.degenMaster),
    abi: degenMasterAbi
  },

  ashSwapAggregator: {
    simpleAddress: scAddress.ashSwapAggregator,
    address: new Address(scAddress.ashSwapAggregator),
    abi: aggregatorAbi
  },

  bskFarm: {
    simpleAddress: scAddress.bskFarm,
    address: new Address(scAddress.bskFarm),
    abi: bskFarmAbi
  },
  oneDexFarm: {
    simpleAddress: scAddress.oneDexFarm,
    address: new Address(scAddress.oneDexFarm),
    abi: onDexFarmAbi
  },
  hatomParent: {
    simpleAddress: scAddress.hatomParent,
    address: new Address(scAddress.hatomParent),
    abi: hatomParentAbi
  },
  ashSwapFarm: {
    simpleAddress: scAddress.ashSwapFarm,
    address: new Address(scAddress.ashSwapFarm),
    abi: ashSwapFarmAbi
  }
};

export type SmartContractConfigTypes = keyof typeof smartContractsConfig;
