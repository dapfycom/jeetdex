'use client';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useAppDispatch, useAppSelector } from '@/hooks';
import CreatePoolForm from './components/CreatePoolForm/CreatePoolForm';
import SetLpForm from './components/SetLpForm/SetLpForm';
import {
  selectActiveCreatePoolStep,
  setActiveStep,
  stepsType
} from './utils/slice';

const CreatePoolsContainer = () => {
  const activeStep = useAppSelector(selectActiveCreatePoolStep);
  const dispatch = useAppDispatch();
  return (
    <Tabs
      defaultValue='create-pool'
      className='w-[400px]'
      value={activeStep}
      onValueChange={(step) => dispatch(setActiveStep(step as stepsType))}
    >
      <TabsContent value='create-pool'>
        <CreatePoolForm />
      </TabsContent>
      <TabsContent value='set-lp'>
        <SetLpForm />
      </TabsContent>
      <TabsContent value='set-roles'>
        <CreatePoolForm />
      </TabsContent>
    </Tabs>
  );
};

export default CreatePoolsContainer;
