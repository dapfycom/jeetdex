import { nav } from '@/localConstants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { headers } from 'next/headers';
import Link from 'next/link';

import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  const headersList = headers();
  const deviceType = headersList.get('x-device-type');
  const isMobile = deviceType === 'mobile';

  return (
    <>
      {children}

      {isMobile && (
        <div className='bg-[#08111b] px-6 py-5 flex justify-between fixed bottom-0 left-0 right-0 w-full h-[80px] z-[100] sm:hidden '>
          {nav.map((item) => {
            return (
              <Link
                href={`?tab=${item.href}`}
                key={item.href}
                className='bg-none data-[state=active]:bg-transparent px-2 py-2 data-[state=active]:text-white data-[state=active]:font-bold  text-gray-400'
              >
                <span className='flex items-center justify-center '>
                  <FontAwesomeIcon
                    icon={item.label}
                    className=' w-[20px] h-[20px]'
                  />
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Layout;
