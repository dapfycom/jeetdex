import {
  IconDefinition,
  faChartLine,
  faClipboardList,
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
  href: string;
};

export const nav: NavItem[] = [
  { label: faSearch, href: 'info' },
  { label: faChartLine, href: 'chart' },
  { label: faExchange, href: 'buy/sell' },
  { label: faClipboardList, href: 'txs' },
  { label: faHome, href: '/' }
];
