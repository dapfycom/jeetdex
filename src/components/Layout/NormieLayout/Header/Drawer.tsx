'use client';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import { Sidebar } from './Sidebar';
import dynamic from 'next/dynamic';
const FloatingButton = dynamic(
  () => import('@/components/DraggableButton/DraggableButton'),
  {
    ssr: false
  }
);
export function DrawerDialogDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        <FloatingButton initialPosition={{ x: window.innerWidth - 10, y: 30 }}>
          <div className='w-full mb-4  lg:hidden absolute  bottom-[-60px]   sm:translate-x-0 right-[0px] flex justify-end'>
            <Button variant='outline' className='rounded-full'>
              ⌘
            </Button>
          </div>
        </FloatingButton>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>Menu</DrawerTitle>
        </DrawerHeader>
        <Sidebar className='px-4' noTitle close={() => setOpen(false)} />
        <DrawerFooter className='pt-2'>
          <DrawerClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
