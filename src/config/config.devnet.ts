import { EnvironmentsEnum } from '@/types';

export * from './sharedConfig';

export const API_URL = 'https://devnet-template-api.multiversx.com';
export const sampleAuthenticatedDomains = [API_URL];
export const environment = EnvironmentsEnum.devnet;
export const network = {
  id: 'devnet',
  name: 'Devnet',
  egldLabel: 'xEGLD',
  walletAddress: 'https://devnet-wallet.multiversx.com',
  apiAddress:
    process.env.NEXT_PUBLIC_ELROND_API || 'https://devnet-api.multiversx.com',
  gatewayAddress: 'https://devnet-gateway.multiversx.com',
  explorerAddress: 'http://devnet-explorer.multiversx.com',
  graphQlAddress: 'https://devnet-exchange-graph.multiversx.com/graphql',
  apiTimeout: 10000,
  walletConnectBridgeAddresses: ['https://bridge.walletconnect.org']
};

export const ChainID = 'D';

export const scAddress = {
  wrapEGLDShard0:
    'erd1qqqqqqqqqqqqqpgqfj3z3k4vlq7dc2928rxez0uhhlq46s6p4mtqerlxhc',
  wrapEGLDShard1:
    'erd1qqqqqqqqqqqqqpgqfj3z3k4vlq7dc2928rxez0uhhlq46s6p4mtqerlxhc',
  wrapEGLDShard2:
    'erd1qqqqqqqqqqqqqpgqfj3z3k4vlq7dc2928rxez0uhhlq46s6p4mtqerlxhc',
  mainRouter: 'erd1qqqqqqqqqqqqqpgqvquukl6q57th8jc3jxq34clsl8f8f0d2d8ssl70xxt',
  dust: 'erd1qqqqqqqqqqqqqpgqlumqk6qw6mcq4jse4hlkwserhn9dl3wyd8ss3qs95c',
  metachain: 'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzllls8a5w6u'
};

export const tokensID = {
  egld: 'EGLD',
  wegld: 'WEGLD-a28c59',
  jeet: 'WEGLD-a28c59',
  bsk: 'JEETDEX-fa1a41'
};
