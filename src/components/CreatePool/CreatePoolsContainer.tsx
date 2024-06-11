'use client';
import { useRef } from 'react';
import ChooseToken from './components/ChooseToken/ChooseToken';
import CreatePoolForm from './components/CreatePoolForm/CreatePoolForm';
import AddInitialLiquidityForm from './components/LockPlView/components/AddInitialLiquidityForm';
import SetLocalRoles from './components/SetLocalRoles/SetLocalRoles';
import SetLpForm from './components/SetLpForm/SetLpForm';
import { useGetPoolPair, usePoolHaveSwaps } from './utils/swr.hooks';

const CreatePoolsContainer = () => {
  const createPoolRef = useRef<HTMLDivElement>(null);
  const setLpRef = useRef<HTMLDivElement>(null);
  const setLocaleRef = useRef<HTMLDivElement>(null);
  const addInitialLiquidityRef = useRef<HTMLDivElement>(null);
  const { pair } = useGetPoolPair();
  const { haveSwaps } = usePoolHaveSwaps(pair);

  const scrollToCreatePool = () => {
    if (createPoolRef.current) {
      createPoolRef.current.scrollIntoView;
    }
  };

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
    <div>
      <div className='max-h-[600px] overflow-auto'>
        <div className='flex flex-col items-center text-center '>
          <div className='w-full px-3 flex flex-col gap-4'>
            <ChooseToken onNextStep={scrollToCreatePool} />
            {haveSwaps ? (
              <p className='h-9 w-full bg-[#1C243E] flex items-center justify-center rounded-sm '>
                you already created a pool for this token
              </p>
            ) : (
              <>
                <CreatePoolForm onNextStep={scrollToSetLp} />
                <SetLpForm ref={setLpRef} onNextStep={scrollToSetLocale} />
                <SetLocalRoles
                  ref={setLocaleRef}
                  onNextStep={scrollToAddInitialLiquidity}
                />
                <AddInitialLiquidityForm ref={addInitialLiquidityRef} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePoolsContainer;
