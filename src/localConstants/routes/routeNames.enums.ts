export enum RouteNamesEnum {
  home = '/',
  nfts = '/nfts',
  swap = '/swap',
  burn = '/burn',
  dust = '/dust'
}

type NavItem = 'info' | 'chart' | 'buy/sell' | 'txs';

export const nav: NavItem[] = ['info', 'chart', 'buy/sell', 'txs'];
