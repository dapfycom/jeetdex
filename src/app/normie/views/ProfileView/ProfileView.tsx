'use client';
import { network } from '@/config';
import { fetchAxiosJeetdex } from '@/services/rest/api';
import { formatAddress } from '@/utils/mx-utils';
import { faHeart, faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import useSWR from 'swr';
import ProfileContext, { ContextType } from './ProfileContext';
import ProfileTabs from './components/Tabs';
import UserAvatar from './components/UpdateUserImg';
const EditProfile = dynamic(() => import('./components/EditProfile'), {
  ssr: false
});

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
  const user = data?.data;
  console.log(user);
  return (
    <ProfileContext ctxValue={data?.data}>
      <div
        key='1'
        className='flex flex-col h-fit items-center justify-center bg-[#1C243E] p-6 rounded-3xl text-white max-w-2xl w-full m-auto mt-8 sm:mt-0'
      >
        <UserAvatar />
        <EditProfile />

        <div className='flex flex-col sm:flex-row gap-2 items-center space-x-2 mb-4'>
          <div className='flex items-center'>
            <FontAwesomeIcon icon={faHeart} className='text-red-500  w-5 h-5' />
            <span className='ml-1'>
              Likes received: {user._count.likesReceived}
            </span>
          </div>
          <div className='flex items-center'>
            <FontAwesomeIcon
              icon={faMessage}
              className='text-blue-500  w-5 h-5'
            />
            <span className='ml-1'>Mentions received: 0</span>
          </div>
        </div>
        <div className='bg-[#0b102280] text-sm p-3 rounded mb-4'>
          {formatAddress(user.address)}
        </div>
        <Link
          className='block mb-4 text-blue-500 underline'
          href={`${network.explorerAddress}/accounts/${user.address}`}
          target='_blank'
        >
          View on Explorer
        </Link>

        <div className='flex space-x-4 border-b overflow-auto w-full'>
          <ProfileTabs />
        </div>
      </div>
    </ProfileContext>
  );
};

export default ProfileView;
