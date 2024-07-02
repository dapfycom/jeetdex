'use client';

import dynamic from 'next/dynamic';

const DrawerDialogDemo = dynamic(() => import('./Drawer'), {
  ssr: false
});

const ClientDrawer = () => {
  return <DrawerDialogDemo />;
};

export default ClientDrawer;
