'use client';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  selectActiveCreatePoolStep,
  setActiveStep,
  stepsType
} from '../utils/slice';
import CreatePoolForm from './components/CreatePoolForm/CreatePoolForm';
import SetLocalRoles from './components/SetLocalRoles/SetLocalRoles';
import SetLpForm from './components/SetLpForm/SetLpForm';

const CreatePoolsContainer = () => {
  const activeStep = useAppSelector(selectActiveCreatePoolStep);
  const dispatch = useAppDispatch();
  return (
    <Tabs
      defaultValue='create-pool'
      className='w-full max-w-[400px]'
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
        <SetLocalRoles />
      </TabsContent>
    </Tabs>
  );
};

export default CreatePoolsContainer;
