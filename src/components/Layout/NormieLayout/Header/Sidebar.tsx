'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

export const adminRoutes = [
  {
    path: '/',
    title: '[ Swap ]'
  },
  {
    path: '/pools',
    title: '[ Pool ]'
  },
  {
    path: '/dust',
    title: '[ Dust ]'
  },
  {
    path: '/profile',
    title: '[ Profile ]'
  },
  {
    path: '/new-pool',
    title: '[ Start a new pool today ? ]'
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
  console.log(pathname);

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
                <span>{r.title}</span>
              </Link>
            </Button>
          </Fragment>
        );
      })}
    </div>
  );
};
