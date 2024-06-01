'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { isPathOrSubpath } from '@/utils/urls';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className='text-sm sm:text-lg'>
      <div className='flex gap-2 items-center '>
        <Button
          variant='ghost'
          className={cn(
            'text-gray-400 text-md lg:text-lg rounded-xl hover:bg-[#1c243e83] hover:text-white',
            isPathOrSubpath(
              pathname.split('/')[pathname.split('/').length - 1],
              ['normie']
            ) && ' text-white'
          )}
          asChild
        >
          <Link href='/'>
            <span className='whitespace-nowrap'>Swap</span>
          </Link>
        </Button>

        <Button
          variant='ghost'
          className={cn(
            'text-gray-400 text-md lg:text-lg rounded-xl hover:bg-[#1c243e83] hover:text-white',
            isPathOrSubpath(
              pathname.split('/')[pathname.split('/').length - 1],
              ['pools']
            ) && ' text-white'
          )}
          asChild
        >
          <Link href='/pools'>
            <span className='whitespace-nowrap'>Pool</span>
          </Link>
        </Button>

        <Button
          variant='ghost'
          className={cn(
            'text-gray-400 text-md lg:text-lg rounded-xl hover:bg-[#1c243e83] hover:text-white',
            isPathOrSubpath(
              pathname.split('/')[pathname.split('/').length - 1],
              ['dust']
            ) && ' text-white'
          )}
          asChild
        >
          <Link href='/dust'>
            <span className='whitespace-nowrap'>Dust</span>
          </Link>
        </Button>

        <Button
          variant='ghost'
          className={cn(
            ' text-gray-400text-md lg:text-lg rounded-xl hover:bg-[#1c243e83] hover:text-white',
            isPathOrSubpath(
              pathname.split('/')[pathname.split('/').length - 1],
              ['/']
            ) && ' text-white'
          )}
          asChild
        >
          <Link href='#'>
            <span className='whitespace-nowrap'>More</span>
          </Link>
        </Button>
      </div>

      <div className='flex gap-2 items-center'></div>
    </div>
  );
};

export default Navbar;
