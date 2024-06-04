import { network } from '@/config';
import prisma from '@/db';
import { getSession } from '@/utils/server-utils/sessions';
import { faHeart, faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import ProfileContext from './ProfileContext';
import ProfileTabs from './components/Tabs';
import UserAvatar from './components/UpdateUserImg';
const EditProfile = dynamic(() => import('./components/EditProfile'), {
  ssr: false
});

const ProfileView = async () => {
  const session = await getSession();

  const user = await prisma.users.findUnique({
    where: {
      address: session.address
    },
    include: {
      _count: {
        select: {
          likesReceived: true
        }
      },
      followed: {
        include: {
          following: true
        }
      },
      following: {
        include: {
          followed: true
        }
      },
      messages: {
        include: {
          likes: {
            include: {
              likedBy: true
            }
          },
          chat: true
        }
      }
    }
  });

  if (!user) {
    return null;
  }

  return (
    <ProfileContext ctxValue={user}>
      <div
        key='1'
        className='flex flex-col h-fit items-center justify-center bg-[#1C243E] p-6 rounded-3xl text-white max-w-4xl w-full m-auto'
      >
        <UserAvatar />
        <EditProfile />

        <div className='flex items-center space-x-2 mb-4'>
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
          {user.address}
        </div>
        <Link
          className='block mb-4 text-blue-500 underline'
          href={`${network.explorerAddress}/accounts/${user.address}`}
          target='_blank'
        >
          View on Explorer
        </Link>

        <div className='flex space-x-4 border-b '>
          <ProfileTabs />
        </div>
      </div>
    </ProfileContext>
  );
};

export default ProfileView;
