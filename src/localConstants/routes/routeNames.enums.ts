import {
  IconDefinition,
  faChartLine,
  faExchange,
  faHome,
  faSearch
} from '@fortawesome/free-solid-svg-icons';

export enum RouteNamesEnum {
  home = '/',
  nfts = '/nfts',
  swap = '/swap',
  burn = '/burn',
  dust = '/dust'
}

type NavItem = {
  label: IconDefinition;
  href: 'info' | 'chart' | 'buy/sell' | 'txs';
};

export const nav: NavItem[] = [
  { label: faSearch, href: 'info' },
  { label: faChartLine, href: 'chart' },
  { label: faExchange, href: 'buy/sell' },
  { label: faHome, href: 'txs' }
];
