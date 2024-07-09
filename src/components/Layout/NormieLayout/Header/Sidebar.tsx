'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  faBroom,
  faChartLine,
  faRightLeft,
  faSquarePollHorizontal,
  faUser,
  faWaterLadder
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

export const adminRoutes = [
  {
    path: '/',
    title: 'Swap',
    icon: faRightLeft
  },
  {
    path: '/pools',
    title: 'Pool',
    icon: faWaterLadder
  },
  {
    path: '/dust',
    title: 'Dust',
    icon: faBroom
  },
  {
    path: '/profile',
    title: 'Profile',
    icon: faUser
  },
  {
    path: '/analytics',
    title: 'Analytics',
    icon: faChartLine
  },
  {
    path: '/new-pool',
    title: 'Start a new pool today ?',
    icon: faSquarePollHorizontal
  }
];

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  noTitle?: boolean;
  close: () => void;
}

export function Sidebar({ className, noTitle }: SidebarProps) {
  return (
    <div className={cn('pb-12', className)}>
      <div className='space-y-4 py-4'>
        <div className='px-3 py-2'>
          {noTitle ? null : (
            <h2 className='mb-2 px-4 text-lg font-semibold tracking-tight'>
              Menu
            </h2>
          )}
          <MenuLinks />
        </div>
      </div>
    </div>
  );
}

export const MenuLinks = () => {
  let pathname = usePathname();
  if (pathname.startsWith('/normie')) {
    pathname = pathname.slice('/normie'.length);
  }

  return (
    <div className='space-y-1'>
      {adminRoutes.map((r) => {
        const active =
          pathname === r.path || (r.path === '/' && pathname === '');
        return (
          <Fragment key={r.path}>
            <Button
              asChild
              className={cn(
                'w-full justify-start px-0 bg-transparent hover:bg-transparent',
                active ? 'text-primary' : 'text-white'
              )}
            >
              <Link href={r.path}>
                <FontAwesomeIcon icon={r.icon} />
                <span className='ml-3'>{r.title}</span>
              </Link>
            </Button>
          </Fragment>
        );
      })}
    </div>
  );
};
