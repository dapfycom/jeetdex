'use client';

import { ExtensionLoginButton } from '@multiversx/sdk-dapp/UI/extension/ExtensionLoginButton';
import { OnProviderLoginType } from '@multiversx/sdk-dapp/types';
import { usePathname } from 'next/navigation';

const desktopLoginComponent = (
  <span className='flex items-center gap-2 h-full relative top-[-25px] right-[-20px] '>
    [connect wallet]
  </span>
);

const ConnectComponent = () => {
  const pathname = usePathname();

  const commonProps: OnProviderLoginType = {
    callbackRoute: pathname,

    nativeAuth: true // optional,
  };

  return (
    <ExtensionLoginButton
      className='!bg-transparent !border-0 hover:font-bold !p-0 !m-0 '
      {...commonProps}
    >
      {desktopLoginComponent}
    </ExtensionLoginButton>
  );
};

export default ConnectComponent;
