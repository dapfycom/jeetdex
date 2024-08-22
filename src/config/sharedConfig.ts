// Generate your own WalletConnect 2 ProjectId here: https://cloud.walletconnect.com/app
export const walletConnectV2ProjectId = 'b4ed639e8224c8ab6774266691ba7944';
export const apiTimeout = 6000;
export const transactionSize = 10;
export const nativeAuth = true;
export const BATCH_TRANSACTIONS_SC = {
  egld_wEGLD: {
    contract: 'erd1qqqqqqqqqqqqqpgqpv09kfzry5y4sj05udcngesat07umyj70n4sa2c0rp',
    data: 'wrapEgld'
  },
  wEGLD_USDC: {
    contract: 'erd1qqqqqqqqqqqqqpgqtqfhy99su9xzjjrq59kpzpp25udtc9eq0n4sr90ax6',
    data: 'ESDTTransfer@5745474C442D613238633539@06f05b59d3b20000@73776170546f6b656e734669786564496e707574@555344432D333530633465@01'
  },
  wEGLD_MEX: {
    contract: 'erd1qqqqqqqqqqqqqpgqzw0d0tj25qme9e4ukverjjjqle6xamay0n4s5r0v9g',
    data: 'ESDTTransfer@5745474C442D613238633539@06f05b59d3b20000@73776170546f6b656e734669786564496e707574@4D45582D613635396430@01'
  },
  lock_MEX: {
    contract: 'erd1qqqqqqqqqqqqqpgq2l97gw2j4wnlem4y2rx7dudqlssjtwpu0n4sd0u3w2',
    data: 'ESDTTransfer@4D45582D613635396430@0de0b6b3a7640000@6c6f636b546f6b656e73@05a0'
  }
};

export const routeNames = {
  herotag: '/normie/tools/herotag',
  xfees: '/normie/tools/x-fees',
  xstkRewards: '/normie/tools/staking-providers-rewards',
  xpayments: '/normie/tools/x-payments',
  raffle: '/normie/tools/raffle'
};
