import { EnvironmentsEnum } from '@/types';

export * from './sharedConfig';

export const contractAddress =
  'erd1qqqqqqqqqqqqqpgqq3qsdxf55rlz5ka8mw3jdnacm8dlkuy09l5ql0wrlm';
export const API_URL = 'https://testnet-template-api.multiversx.com';
export const sampleAuthenticatedDomains = [API_URL];
export const environment = EnvironmentsEnum.testnet;

export const network = {
  id: 'testnet',
  name: 'Testnet',
  egldLabel: 'xEGLD',
  walletAddress: 'https://testnet-wallet.multiversx.com',
  apiAddress:
    process.env.NEXT_PUBLIC_ELROND_API || 'https://testnet-api.multiversx.com',
  gatewayAddress: 'https://testnet-gateway.multiversx.com',
  explorerAddress: 'http://testnet-explorer.multiversx.com',
  graphQlAddress: 'https://testnet-exchange-graph.multiversx.com/graphql',
  apiTimeout: 10000,
  walletConnectBridgeAddresses: ['https://bridge.walletconnect.org']
};

export const ChainID = 'T';

export const scAddress = {
  mintJeeter: '',
  wrapEGLDShard0:
    'erd1qqqqqqqqqqqqqpgqvc7gdl0p4s97guh498wgz75k8sav6sjfjlwqh679jy',
  wrapEGLDShard1:
    'erd1qqqqqqqqqqqqqpgqhe8t5jewej70zupmh44jurgn29psua5l2jps3ntjj3',
  wrapEGLDShard2:
    'erd1qqqqqqqqqqqqqpgqmuk0q2saj0mgutxm4teywre6dl8wqf58xamqdrukln'
};

export const tokensID = {
  egld: 'EGLD',
  wegld: 'WEGLD-d7c6bb'
};
