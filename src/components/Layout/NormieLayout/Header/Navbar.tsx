'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { isPathOrSubpath } from '@/utils/urls';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();
  console.log(pathname);
  console.log(pathname.split('/')[pathname.split('/').length - 1]);

  return (
    <div className='text-sm sm:text-lg'>
      <div className='flex gap-4 items-center '>
        <Button
          variant='ghost'
          className={cn(
            'text-2xl rounded-xl hover:bg-[#1c243e83]',
            isPathOrSubpath(
              pathname.split('/')[pathname.split('/').length - 1],
              ['normie']
            ) && 'bg-[#1c243e83]'
          )}
          asChild
        >
          <Link href='/' className='hover:font-bold'>
            <span className='whitespace-nowrap'>Swap</span>
          </Link>
        </Button>

        <Button
          variant='ghost'
          className={cn(
            'text-2xl rounded-xl hover:bg-[#1c243e83]',
            isPathOrSubpath(
              pathname.split('/')[pathname.split('/').length - 1],
              ['pools']
            ) && 'bg-[#1c243e83]'
          )}
          asChild
        >
          <Link href='/pools' className='hover:font-bold'>
            <span className='whitespace-nowrap'>Pool</span>
          </Link>
        </Button>

        <Button
          variant='ghost'
          className={cn(
            'text-2xl rounded-xl hover:bg-[#1c243e83]',
            isPathOrSubpath(
              pathname.split('/')[pathname.split('/').length - 1],
              ['dust']
            ) && 'bg-[#1c243e83]'
          )}
          asChild
        >
          <Link href='/dust' className='hover:font-bold'>
            <span className='whitespace-nowrap'>Dust</span>
          </Link>
        </Button>

        <Button
          variant='ghost'
          className={cn(
            'text-2xl rounded-xl hover:bg-[#1c243e83]',
            isPathOrSubpath(
              pathname.split('/')[pathname.split('/').length - 1],
              ['/']
            ) && 'bg-[#1c243e83]'
          )}
          asChild
        >
          <Link href='#' className='hover:font-bold'>
            <span className='whitespace-nowrap'>More</span>
          </Link>
        </Button>
      </div>

      <div className='flex gap-2 items-center'></div>
    </div>
  );
};

export default Navbar;
