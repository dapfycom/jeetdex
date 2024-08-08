import {
  MaiarAppIcon,
  MaiarDefiWalletIcon,
  WebWalletIcon
} from '@/components/icons/ui-icons';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { ChevronRight } from 'lucide-react';
import React, { ReactNode, useEffect } from 'react';

import { walletConnectV2ProjectId } from '@/config';
import { useAuthentication } from '@/hooks';
import { useAppDispatch } from '@/hooks/useRedux';
import { openLogin } from '@/redux/dapp/dapp-slice';
import { ExtensionLoginButton } from '@multiversx/sdk-dapp/UI/extension/ExtensionLoginButton';
import { WalletConnectLoginButton } from '@multiversx/sdk-dapp/UI/walletConnect/WalletConnectLoginButton';
import { WebWalletLoginButton } from '@multiversx/sdk-dapp/UI/webWallet/WebWalletLoginButton';
import { OnProviderLoginType } from '@multiversx/sdk-dapp/types';
import { usePathname } from 'next/navigation';

const mobileLoginComponent = (
  <div className='flex items-center gap-2 h-full'>
    {' '}
    <MaiarAppIcon /> xPortal App{' '}
  </div>
);
const desktopLoginComponent = (
  <div className='flex items-center gap-2 h-full'>
    {' '}
    <MaiarDefiWalletIcon /> MultiversX DeFi Wallet{' '}
  </div>
);
const webWalletLoginComponent = (
  <div className='flex items-center gap-2 h-full'>
    {' '}
    <WebWalletIcon /> MultiversX Web Wallet{' '}
  </div>
);

const ConnectComponent = () => {
  const dispatch = useAppDispatch();
  const { isLoginModal } = useAuthentication();
  const path = usePathname();
  const handleChangeModalOpen = (open: boolean) => {
    dispatch(openLogin(open));
  };
  const commonProps: OnProviderLoginType = {
    callbackRoute: path,

    nativeAuth: true // optional
  };
  return (
    <Dialog open={isLoginModal} onOpenChange={handleChangeModalOpen}>
      <DialogTrigger asChild>
        <Button className='!bg-transparent !border-0 hover:font-bold !p-0 !m-0  flex items-center gap-2 h-[full] relative  text-white'>
          [connect wallet]
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> Connect Your Wallet</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='flex flex-col items-center gap-3'>
            <LoginMethod as={ExtensionLoginButton} {...commonProps}>
              {desktopLoginComponent}
            </LoginMethod>

            <LoginMethod
              as={WalletConnectLoginButton}
              {...commonProps}
              {...(walletConnectV2ProjectId
                ? {
                    isWalletConnectV2: true
                  }
                : {})}
            >
              {mobileLoginComponent}
            </LoginMethod>

            <LoginMethod as={WebWalletLoginButton} {...commonProps}>
              {webWalletLoginComponent}
            </LoginMethod>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectComponent;

interface LoginMethodProps {
  children: ReactNode;
  as?: React.ElementType;
}

const LoginMethod = ({
  children,
  as: Container = 'div',
  ...props
}: LoginMethodProps) => {
  useEffect(() => {
    const dappBtn = document.getElementsByClassName(
      'dapp-core-component__main__btn'
    );
    // remove all classes

    if (dappBtn && dappBtn.length > 0) {
      const listOfClasses = [
        'dapp-core-component__main__btn',
        'dapp-core-component__main__btn-primary',
        'dapp-core-component__main__px-4',
        'dapp-core-component__main__m-1'
      ];

      for (let i = 0; i < dappBtn.length; i++) {
        const element = dappBtn[i];
        for (let j = 0; j < listOfClasses.length; j++) {
          const className = listOfClasses[j];
          element.classList.remove(className);
        }
      }
    }
  }, []);
  return (
    <Button asChild id='dapp-btn-login' className='bg-white'>
      {/* <ExtensionLoginButton buttonClassName=""   /> */}
      <Container
        className='hidden'
        buttonClassName='!flex w-full justify-between py-2 bg-red-500'
        {...props}
      >
        {children}
        <ChevronRight />
      </Container>
    </Button>
  );
};
