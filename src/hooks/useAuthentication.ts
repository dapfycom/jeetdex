import { logoutFromSession } from '@/actions/user';
import { admins } from '@/localConstants/admin';
import {
  openLogin,
  selectIsLoginModal,
  selectUserAddress
} from '@/redux/dapp/dapp-slice';
import { useGetLoginInfo } from '@multiversx/sdk-dapp/hooks';
import { logout } from '@multiversx/sdk-dapp/utils';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './useRedux';

export const useAuthentication = () => {
  const dispatch = useAppDispatch();
  const isOpenLoginModal = useAppSelector(selectIsLoginModal);
  const currentAddress = useAppSelector(selectUserAddress);
  const { isLoggedIn, tokenLogin } = useGetLoginInfo();

  const handleConnect = () => {
    dispatch(openLogin(true));
  };
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
    isLoggedIn,
    tokenLogin,
    address: currentAddress,
    isAdmin:
      process.env.NODE_ENV !== 'production' || admins.includes(currentAddress),
    isLoginModal: isOpenLoginModal,
    handleConnect,
    handleDisconnect
  };
};
