export const egldStaticData = {
  type: 'FungibleESDT',
  identifier: 'EGLD',
  name: 'EGLD',
  ticker: 'EGLD',
  decimals: 18,
  assets: {
    svgUrl: '/assets/img/egld.svg'
  }
};

export const jeetStaticData = {
  type: 'FungibleESDT',
  identifier: 'JEET-dda037',
  name: 'JEETER',
  ticker: 'JEET',
  owner: 'erd1qqqqqqqqqqqqqpgqggfjh54lnxzdtfv5ypgqgu2qg8qy4vt2984swfuc55',
  initialMinted: '499996906000000000000000000',
  decimals: 18,
  isPaused: false,
  assets: {
    website: 'https://www.dapfy.com/en',
    description: "Don't be a fucking JEET.",
    status: 'active',
    pngUrl: 'https://media.elrond.com/tokens/asset/JEET-dda037/logo.png',
    svgUrl: 'https://media.elrond.com/tokens/asset/JEET-dda037/logo.svg',
    social: { telegram: 'https://t.me/dapfydotcom' }
  },

  canUpgrade: false,
  canMint: false,
  canBurn: true,
  canChangeOwner: false,
  canAddSpecialRoles: false,
  canPause: false,
  canFreeze: false,
  canWipe: false,
  mexPairType: 'experimental',

  roles: [
    {
      canLocalMint: false,
      canLocalBurn: false,
      roles: ['ESDTRoleBurnForAll']
    }
  ]
};
