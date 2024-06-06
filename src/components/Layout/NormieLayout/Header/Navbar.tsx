'use client';
import Link from 'next/link';

const Navbar = () => {
  // const pathname = usePathname();

  return (
    <div className='text-md text-center'>
      <div>
        <div className='flex gap-2 items-center justify-center'>
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

        <div className='flex gap-2 items-center md:justify-start justify-center'>
          <a
            href='https://insigh.to/b/jeetdex'
            target='_blank'
            rel='noopener noreferrer'
          >
            [report bug]
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
