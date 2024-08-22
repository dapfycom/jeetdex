'use client';
import { useAuthentication } from '@/hooks';
import { DrawerDialogDemo } from '@/views/AdminPanelView/common/Drawer';
import { Sidebar } from '@/views/AdminPanelView/common/Sidebar';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';

const AdminLayoute = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { isAdmin } = useAuthentication();
  useEffect(() => {
    if (!isAdmin) {
      router.replace('/');
    }
  }, [isAdmin, router]);

  if (!isAdmin) {
    return (
      <div className='my-10'>
        <Loader />
      </div>
    );
  }
  return (
    <div className='mt-24'>
      <DrawerDialogDemo />
      <div className='border-t'>
        <div className='bg-background'>
          <div className='grid lg:grid-cols-5'>
            <Sidebar className='hidden lg:block' />
            <div className='col-span-3 lg:col-span-4 lg:border-l min-h-[70vh]'>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayoute;
