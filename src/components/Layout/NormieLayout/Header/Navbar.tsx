'use client';
import Link from 'next/link';

const normieRoutes = [
  { label: 'Swap', href: '/normie/' },
  { label: 'Pool', href: '/normie/pools' },
  { label: 'Dust', href: '/normie/dust' },
  { label: 'Analytics', href: '/normie/analytics' },
  { label: 'Farms', href: '/normie/farms' },
  { label: 'Tools', href: '/normie/tools' }
];

const Navbar = () => {
  return (
    <div className='text-sm sm:text-md text-center'>
      <div className='flex gap-2 items-center justify-start flex-wrap max-w-[200px] '>
        {normieRoutes.map((route) => (
          <Link key={route.label} href={route.href} className='hover:font-bold'>
            [{route.label}]
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
