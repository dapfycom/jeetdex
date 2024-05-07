import { RouteNamesEnum } from '@/localConstants';
import { RouteType } from '@/types';

interface RouteWithTitleType extends RouteType {
  title: string;
}

export const routes: RouteWithTitleType[] = [
  {
    path: RouteNamesEnum.home,
    title: 'Home',
    component: null
  }
];
