const ENVIRONMENT = 'mainnet';
type DappContracts = {
  voteEscrowedContract: string;
  feeDistributor: string;
  farmController: string;
  farmBribe: string;
  farmRouter: string;
  router: string;
  dao: string;
  daoBribe: string;
  aggregator: string;
};

const dappContractMainnet: DappContracts = {
  voteEscrowedContract:
    'erd1qqqqqqqqqqqqqpgq58elfqng8edp0z83pywy3825vzhawfqp4fvsaldek8',
  feeDistributor:
    'erd1qqqqqqqqqqqqqpgqjrlge5rgml6d48tjgu3afqvems88lqzw4fvs9f7lhs',
  farmController:
    'erd1qqqqqqqqqqqqqpgqzhm689ehkacadr7elzkc3z70h6cqmz0q4fvsftax5t',
  farmBribe: 'erd1qqqqqqqqqqqqqpgqgulmfcu8prrv2pmx3nqn5stqu3c42fsz4fvsa9rwdl',
  farmRouter: 'erd1qqqqqqqqqqqqqpgqe0k2j45f3w9krhx2gl0j8fpg2ksepaea4fvssap9nd',
  router: 'erd1qqqqqqqqqqqqqpgqjtlmapv42pcga5nglgfrnpqvkq06wdqx4fvsvw6xpt',
  dao: 'erd1qqqqqqqqqqqqqpgqvdkft2eq9zh7cu9tkxartshu764tqe7s4fvsaw99xj',
  daoBribe: 'erd1qqqqqqqqqqqqqpgqzsmhsv625er2w6w7rel7kmustn3u838f4fvs36jdmc',
  aggregator: 'erd1qqqqqqqqqqqqqpgqcc69ts8409p3h77q5chsaqz57y6hugvc4fvs64k74v'
};

const dappContract = dappContractMainnet;

export const ASHSWAP_CONFIG = {
  ashApiBaseUrl:
    ENVIRONMENT === 'mainnet'
      ? 'https://api.ashswap.io'
      : 'https://api-devnet2.ashswap.io',
  ashGraphBaseUrl:
    ENVIRONMENT === 'mainnet'
      ? 'https://api-v2.ashswap.io/graphql'
      : 'https://api-v2-devnet2.ashswap.io/graphql',
  dappContract,
  farmWeightVoteDelay: 3600
} as const;
