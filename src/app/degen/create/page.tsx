import GoBackButton from '@/components/GoBackButton';
import React from 'react';
import CreateTokenForm from './form';

const CreatePage = () => {
  return (
    <div className='flex flex-col gap-6 w-full items-center'>
      <GoBackButton>[go back]</GoBackButton>

      <CreateTokenForm />
    </div>
  );
};

export default CreatePage;
