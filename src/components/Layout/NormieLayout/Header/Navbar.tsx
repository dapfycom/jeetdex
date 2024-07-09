'use client';
import Link from 'next/link';

const Navbar = () => {
  // const pathname = usePathname();

  return (
    <div className='text-sm sm:text-md text-center'>
      <div>
        <div className='flex gap-2 items-center justify-start '>
          <Link href='/' className='hover:font-bold'>
            [Swap]
          </Link>
          <Link href='/pools' className='hover:font-bold'>
            [Pool]
          </Link>
          <div className='flex gap-2 items-center'>
            <Link href='/dust' className='hover:font-bold'>
              [Dust]
            </Link>
          </div>
        </div>

        <div className='flex gap-2 items-center justify-start '>
          <Link href='/analytics' className='hover:font-bold'>
            [Analytics]
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
