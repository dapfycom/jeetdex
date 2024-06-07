'use client';
import { useRef } from 'react';
import AddInitialLiquidityForm from '../LockPlView/components/LockLpForm';
import CreatePoolForm from './components/CreatePoolForm/CreatePoolForm';
import SetLocalRoles from './components/SetLocalRoles/SetLocalRoles';
import SetLpForm from './components/SetLpForm/SetLpForm';

const CreatePoolsContainer = () => {
  // const createPoolRef = useRef<HTMLDivElement>(null);
  const setLpRef = useRef<HTMLDivElement>(null);
  const setLocaleRef = useRef<HTMLDivElement>(null);
  const addInitialLiquidityRef = useRef<HTMLDivElement>(null);

  const scrollToSetLp = () => {
    if (setLpRef.current) {
      setLpRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const scrollToSetLocale = () => {
    if (setLocaleRef.current) {
      setLocaleRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  const scrollToAddInitialLiquidity = () => {
    if (addInitialLiquidityRef.current) {
      addInitialLiquidityRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  return (
    <div className='w-full max-w-[400px] flex flex-col gap-4'>
      <CreatePoolForm onNextStep={scrollToSetLp} />
      <SetLpForm ref={setLpRef} onNextStep={scrollToSetLocale} />
      <SetLocalRoles
        ref={setLocaleRef}
        onNextStep={scrollToAddInitialLiquidity}
      />
      <AddInitialLiquidityForm ref={addInitialLiquidityRef} />
    </div>
  );
};

export default CreatePoolsContainer;
