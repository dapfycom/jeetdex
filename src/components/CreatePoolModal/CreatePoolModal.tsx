'use client';
import IssueToken from '@/components/IssueToken/IssueToken';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import useDisclosure from '@/hooks/useDisclosure';
import {
  faArrowLeft,
  faCoins,
  faWaterLadder
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropsWithChildren, createContext, useState } from 'react';
import CreatePoolsContainer from '../CreatePool/CreatePoolsContainer';
import ActionsBox from './ActionsBox';
const viewContext = createContext<{
  view: 'issue' | 'create-pool';
  setView: (view: 'issue' | 'create-pool') => void;
}>(null);

const CreatePoolModal = ({ children }: PropsWithChildren) => {
  const { isOpen, onToggle } = useDisclosure(false);
  const [view, setView] = useState<'issue' | 'create-pool'>(null);
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (open === false) {
          setView(null);
        }
        onToggle();
      }}
    >
      {children}
      <DialogContent className='p-3'>
        {view === null && (
          <div className='grid grid-cols-2 gap-6 w-full mt-4'>
            <ActionsBox
              icon={faCoins}
              title=' Create new coin now'
              onclick={() => setView('issue')}
            />
            <ActionsBox
              icon={faWaterLadder}
              title='I already have a coin'
              onclick={() => setView('create-pool')}
            />
          </div>
        )}
        {view !== null && (
          <Button
            variant='ghost'
            className='w-fit hover:bg-[#47d4d413]'
            onClick={() => setView(null)}
          >
            <FontAwesomeIcon icon={faArrowLeft} className='mr-3' /> New coin
            today ?
          </Button>
        )}

        <viewContext.Provider value={{ view, setView }}>
          {view === 'issue' && <IssueToken />}

          {view === 'create-pool' && <CreatePoolsContainer />}
        </viewContext.Provider>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePoolModal;
