import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import prisma from '@/db';
import { getSession } from '@/utils/server-utils/sessions';
import {
  faHeart,
  faMessage,
  faPencil
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const ProfileView = async () => {
  const session = await getSession();

  const user = await prisma.users.findUnique({
    where: {
      address: session.address
    },
    include: {
      _count: {
        select: {
          likesReceived: true,
          followers: true
        }
      }
    }
  });
  console.log(user);

  if (!user) {
    return null;
  }

  return (
    <div
      key='1'
      className='flex flex-col h-fit items-center justify-center bg-[#1C243E] p-6 rounded-3xl text-white max-w-2xl m-auto'
    >
      <div className='flex items-center space-x-4 mb-4'>
        <Avatar>
          <AvatarImage alt='Profile picture' src={user.img} />
        </Avatar>
        <div>
          <div className='text-lg font-bold'>@{user.username}</div>
          <div className='text-sm'>{user._count.followers} followers</div>
          {user.bio && <div className='text-sm'>{user.bio}</div>}
        </div>
      </div>
      <Button className='text-xs mb-4 items-center ' variant='outline'>
        Edit profile
        <FontAwesomeIcon icon={faPencil} className='ml-2 w-4 h-4' />
      </Button>
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
      <Link className='block mb-4 text-blue-500 underline' href='#'>
        View on Explorer
      </Link>
      <div className='flex space-x-4 border-b border-gray-600 pb-4 mb-4'>
        <Button variant='ghost'>coins held</Button>
        <Button variant='ghost'>replies</Button>
        <Button variant='ghost'>notifications</Button>
        <Button variant='secondary'>coins created</Button>
        <Button variant='ghost'>followers</Button>
        <Button variant='ghost'>following</Button>
      </div>
      <div className='flex items-center space-x-4 mb-4'>
        <Avatar>
          <AvatarImage
            alt='Coin image'
            src='/placeholder.svg?height=80&width=80'
          />
        </Avatar>
        <div className='text-sm'>
          <div className='font-bold mb-1'>
            Created by
            <span className='text-green-500'>@BuyvES</span>
          </div>
          <div className='mb-1'>market cap: 4.69K</div>
          <div className='mb-1'>replies: 0</div>
          <div className='mb-1'>test (ticker: test123): this is a test</div>
        </div>
      </div>
      <div className='flex justify-between items-center text-sm'>
        <span>[</span>
        <span>1</span>
        <span>{`[ >> ]`}</span>
      </div>
    </div>
  );
};

export default ProfileView;
