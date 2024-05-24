'use client';
import CreatePoolView from '@/app/normie/views/ListTokenView/CreatePoolView/CreatePoolView';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import useDisclosure from '@/hooks/useDisclosure';
import { PropsWithChildren } from 'react';

const CreatePoolModal = ({ children }: PropsWithChildren) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Dialog open={isOpen} onOpenChange={onToggle}>
      {children}
      <DialogContent>
        <CreatePoolView />
      </DialogContent>
    </Dialog>
  );
};

export default CreatePoolModal;
