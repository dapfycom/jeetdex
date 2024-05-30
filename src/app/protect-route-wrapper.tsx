import { getSession } from '@/utils/server-utils/sessions';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

const ProtectRouteWrapper = async ({ children }: PropsWithChildren) => {
  const session = await getSession();
  console.log(session);

  if (!session) {
    redirect('/');
  }

  return <>{children}</>;
};

export default ProtectRouteWrapper;
