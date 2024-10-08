'use client';
import { followUser } from '@/actions/user';
import { Button } from '@/components/ui/button';
import { useGetUserInfo } from '@/hooks';
import { useGetSingleUserInfo } from '@/hooks/useUser';
import { generateRandomString } from '@/utils/strings';
import { errorToast, successToast } from '@/utils/toast';

const FollowButton = ({ user }) => {
  const { userInfo, mutate } = useGetSingleUserInfo(user?.address);

  const { userInfo: currentUserInfo } = useGetUserInfo();

  const followed = userInfo?.data?.followed.find(
    (follow) => follow.followingId === currentUserInfo?.data.id
  );

  const handleFollow = async () => {
    if (!currentUserInfo) {
      errorToast('You need to log in to perferm this action');
    }
    let newData;
    if (followed) {
      newData = {
        data: {
          ...userInfo.data,
          followed: userInfo.data.followed.filter(
            (follow) => follow.followingId !== currentUserInfo.data.id
          )
        }
      };
    } else {
      newData = {
        data: {
          ...userInfo.data,
          followed: [
            ...userInfo.data.followed,

            {
              id: generateRandomString(20),
              followedId: user.id,
              followingId: currentUserInfo.data.id,
              createdAt: new Date(),
              following: { ...currentUserInfo.data }
            }
          ]
        }
      };
    }
    try {
      mutate(
        async () => {
          const res = await followUser(user.id);
          successToast(res.message);

          return newData;
        },
        {
          optimisticData: newData,
          rollbackOnError: true,
          populateCache: true,
          revalidate: false
        }
      );
    } catch (error) {
      console.error(error);

      errorToast('Error following/unfollowing user');
    }
  };

  return (
    <Button className='mb-3' onClick={handleFollow}>
      {followed ? 'Unfollow' : 'Follow'}
    </Button>
  );
};

export default FollowButton;
