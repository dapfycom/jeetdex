'use client';
import Link from 'next/link';

const Navbar = () => {
  // const pathname = usePathname();

  return (
    <div className='text-sm '>
      <div>
        <div className='flex gap-2 items-center'>
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

        <div className='flex gap-2 items-center'>
          <Link href='#' className='hover:font-bold'>
            [report bug]
          </Link>
        </div>
      </div>

      <div className='flex gap-2 items-center'></div>
    </div>
  );
};

export default Navbar;
