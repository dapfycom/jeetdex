import { EnvironmentsEnum } from '@/types';

export * from './sharedConfig';

export const API_URL = 'https://template-api.multiversx.com';
export const explorerAddress = 'https://explorer.multiversx.com';

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
    'erd1qqqqqqqqqqqqqpgqmuk0q2saj0mgutxm4teywre6dl8wqf58xamqdrukln',

  mainRouter: 'erd1qqqqqqqqqqqqqpgqjyycuqgf3hpwccew0257te9cgsh7l0fxtaes73r7w0',
  dust: 'erd1qqqqqqqqqqqqqpgq4lux8f506mkp6zn9kmy8fy2c0xyg375cy26sddccwm',
  metachain: 'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzllls8a5w6u',
  degenMaster: 'erd1qqqqqqqqqqqqqpgq5y7vhpvwk0zzj7cg69cudfzd60dc6588taesau8q5m',
  ashSwapAggregator:
    'erd1qqqqqqqqqqqqqpgqcc69ts8409p3h77q5chsaqz57y6hugvc4fvs64k74v',
  bskFarm: 'erd1qqqqqqqqqqqqqpgqhj8um6tv2ul6u2epd2ca4c6z5v4xt9v5pwkq9cdazl',
  oneDexFarm: 'erd1qqqqqqqqqqqqqpgqwtqs3f42fmmwrm378df5n6ta9v06w45ey26s9e7lly',
  hatomParent: 'erd1qqqqqqqqqqqqqpgq9mpe7jf74uzggju8mrqjrfmnl0p04n7ny26sk4spwh',
  ashSwapFarm: 'erd1qqqqqqqqqqqqqpgqzw9ksvsjwjs0zt3lne6d0v5l9fqa8mj3y26sqjqz77'
};

export const tokensID = {
  egld: 'EGLD',
  wegld: 'WEGLD-bd4d79',
  usdc: 'USDC-c76f1f',

  bsk: 'BSK-baa025',
  jeet: 'JEET-dda037',
  padawan: 'PADAWAN-a17f58',
  bskwegld: 'BSKWEGLD-7cd373'
};
