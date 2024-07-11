import { fetchAxiosJeetdex } from '@/services/rest/api';
import useSWR from 'swr';

export const useGetSingleUserInfo = (userAddress: string) => {
  const { data, error, isLoading, isValidating, mutate } = useSWR<{
    data: {
      id: string;
      username: string;
      address: string;
      img: string;
      bio: string;
      createdAt: string;
      updatedAt: string;
      followed: ({
        following: {
          id: string;
          username: string;
          address: string;
          img: string;
          bio: string;
          createdAt: Date;
          updatedAt: Date;
        };
      } & {
        id: string;
        followedId: string;
        followingId: string;
        createdAt: Date;
      })[];
      following: ({
        following: {
          id: string;
          username: string;
          address: string;
          img: string;
          bio: string;
          createdAt: Date;
          updatedAt: Date;
        };
      } & {
        id: string;
        followedId: string;
        followingId: string;
        createdAt: Date;
      })[];
      _count: {
        likesReceived: number;
      };
    };
  }>(`/user?userAddress=${userAddress}`, fetchAxiosJeetdex);

  return {
    userInfo: data,
    error,
    isLoading,
    isValidating,
    mutate
  };
};
