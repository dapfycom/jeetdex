'use client';
import GoBackButton from '@/components/GoBackButton';
import { fetchAxiosJeetdex } from '@/services/rest/api';
import { Loader2 } from 'lucide-react';
import useSWR from 'swr';
import ProfileContext, { ContextType } from './ProfileContext';
import ProfileTabs from './components/Tabs';
import UserAvatar from './components/UpdateUserImg';

const ProfileView = () => {
  const { data, isLoading } = useSWR<{ data: ContextType }>(
    '/user/private',
    fetchAxiosJeetdex
  );

  if (isLoading) {
    return (
      <div className='bg-[#1C243E]  max-w-2xl w-full m-auto h-[300px] flex justify-center items-center rounded-sm'>
        <Loader2 className='animate-spin w-14 h-14' />
      </div>
    );
  }
  return (
    <ProfileContext ctxValue={data?.data}>
      <div className='mt-8'>
        <div className='flex justify-center w-full mb-3'>
          <GoBackButton>[Go back]</GoBackButton>
        </div>
        <div
          key='1'
          className='flex flex-col h-fit max-h-[800px]  items-center justify-center bg-[#1C243E] p-6 rounded-3xl text-white max-w-2xl w-full m-auto '
        >
          <UserAvatar />

          <div className='flex space-x-4 border-b overflow-x-auto w-full'>
            <ProfileTabs />
          </div>
        </div>
      </div>
    </ProfileContext>
  );
};

export default ProfileView;
