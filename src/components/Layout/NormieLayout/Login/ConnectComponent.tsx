'use client';
import { MaiarDefiWalletIcon } from '@/components/ui/icons';

import { ExtensionLoginButton } from '@multiversx/sdk-dapp/UI/extension/ExtensionLoginButton';
import { OnProviderLoginType } from '@multiversx/sdk-dapp/types';
import { usePathname } from 'next/navigation';

const desktopLoginComponent = (
  <span className='flex items-center gap-2 h-full'>
    {' '}
    <MaiarDefiWalletIcon /> MultiversX DeFi Wallet{' '}
  </span>
);

const ConnectComponent = () => {
  const pathname = usePathname();

  const commonProps: OnProviderLoginType = {
    callbackRoute: pathname,

    nativeAuth: true // optional
  };
  return (
    <ExtensionLoginButton
      className='bg-red-500'
      buttonClassName='bg-red-500'
      {...commonProps}
    >
      {desktopLoginComponent}
    </ExtensionLoginButton>
  );
};

export default ConnectComponent;
