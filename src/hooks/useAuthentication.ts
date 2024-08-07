import { logoutFromSession } from '@/actions/user';
import { admins } from '@/localConstants/admin';
import {
  openLogin,
  selectIsLoginModal,
  selectUserAddress
} from '@/redux/dapp/dapp-slice';
import { fetchAxiosJeetdex } from '@/services/rest/api';
import { useGetLoginInfo } from '@multiversx/sdk-dapp/hooks';
import { logout } from '@multiversx/sdk-dapp/utils';
import { useEffect } from 'react';
import useSWR from 'swr';
import { useAppDispatch, useAppSelector } from './useRedux';

export const useAuthentication = () => {
  const dispatch = useAppDispatch();
  const isOpenLoginModal = useAppSelector(selectIsLoginModal);

  // const [initiateLogin] = useExtensionLogin(commonProps);
  const currentAddress = useAppSelector(selectUserAddress);
  const { isLoggedIn, tokenLogin } = useGetLoginInfo();

  const handleDisconnect = () => {
    logoutFromSession();
    logout('/');
  };

  useEffect(() => {
    // set authToken on localStorage
    if (tokenLogin?.loginToken && tokenLogin.signature) {
      const authToken = tokenLogin.loginToken + ':' + tokenLogin.signature;
      localStorage.setItem('authToken', authToken);
    }
  }, [tokenLogin?.loginToken, tokenLogin?.signature]);

  return {
    isLoginModal: isOpenLoginModal,
    isLoggedIn,
    tokenLogin,
    address: currentAddress,
    isAdmin:
      process.env.NODE_ENV !== 'production' || admins.includes(currentAddress),
    handleConnect: () => dispatch(openLogin(true)),
    handleDisconnect
  };
};

export const useGetUserInfo = () => {
  const { isLoggedIn } = useAuthentication();
  const { data, error, isLoading, isValidating, mutate } = useSWR<{
    data: {
      id: string;
      username: string;
      address: string;
      img: string;
      bio: string;
      createdAt: Date;
      updatedAt: Date;
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
  }>(isLoggedIn ? '/user/private' : null, fetchAxiosJeetdex);

  return {
    userInfo: data,
    error,
    isLoading,
    isValidating,
    mutate
  };
};
