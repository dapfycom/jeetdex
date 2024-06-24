'use client';
import { Button, ButtonProps } from '@/components/ui/button';
import useDisclosure from '@/hooks/useDisclosure';
import {
  faArrowLeft,
  faCoins,
  faWaterLadder
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dynamic from 'next/dynamic';
import { PropsWithChildren, createContext, useState } from 'react';
import Modal from 'react-modal';
import ActionsBox from './ActionsBox';

const IssueToken = dynamic(() => import('@/components/IssueToken/IssueToken'));
const CreatePoolsContainer = dynamic(
  () => import('../CreatePool/CreatePoolsContainer')
);

const viewContext = createContext<{
  view: 'issue' | 'create-pool';
  setView: (view: 'issue' | 'create-pool') => void;
}>(null);

const CreatePoolModal = ({
  children,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  const { isOpen, onToggle, onClose } = useDisclosure(false);
  const [view, setView] = useState<'issue' | 'create-pool'>(null);
  console.log('render');

  return (
    <>
      <Button {...props} onClick={onToggle}>
        {children}
      </Button>
      <Modal
        isOpen={isOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={onClose}
        // style={customStyles}
        contentLabel='Example Modal'
        className='fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200'
      >
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
      </Modal>
    </>
  );
};

export default CreatePoolModal;
