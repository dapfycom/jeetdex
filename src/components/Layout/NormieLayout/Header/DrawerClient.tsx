'use client';
import React from 'react';
import DrawerDialogDemo from './Drawer';

const DrawerClient = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <div
        className='bg-none data-[state=active]:bg-transparent px-2 py-2 data-[state=active]:text-white data-[state=active]:font-bold  text-gray-400 '
        onClick={() => setOpen(true)}
      >
        menu
      </div>
      <DrawerDialogDemo open={open} setOpen={setOpen} />
    </>
  );
};

export default DrawerClient;
