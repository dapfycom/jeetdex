import { EnvironmentsEnum } from '@/types';

export * from './sharedConfig';

export const contractAddress =
  'erd1qqqqqqqqqqqqqpgqtmcuh307t6kky677ernjj9ulk64zq74w9l5qxyhdn7';
export const API_URL = 'https://template-api.multiversx.com';
export const sampleAuthenticatedDomains = [API_URL];
export const environment = EnvironmentsEnum.mainnet;
export const network = {
  id: 'mainnet',
  name: 'Mainnet',
  egldLabel: 'EGLD',
  walletAddress: 'https://wallet.multiversx.com',
  apiAddress:
    process.env.NEXT_PUBLIC_ELROND_API || 'https://api.multiversx.com',
  gatewayAddress: 'https://gateway.multiversx.com',
  explorerAddress: 'http://explorer.multiversx.com',
  graphQlAddress: 'https://exchange-graph.multiversx.com/graphql',
  apiTimeout: 10000,
  walletConnectBridgeAddresses: ['https://bridge.walletconnect.org']
};

export const ChainID = '1';

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
  wegld: 'WEGLD-bd4d79'
};
