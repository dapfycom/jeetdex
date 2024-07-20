'use client';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
        <FontAwesomeIcon icon={faBars} />
      </div>
      <DrawerDialogDemo open={open} setOpen={setOpen} />
    </>
  );
};

export default DrawerClient;
