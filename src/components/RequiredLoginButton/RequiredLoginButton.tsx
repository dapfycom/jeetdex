import { useAuthentication } from '@/hooks';
import { PropsWithChildren } from 'react';
import { Button, ButtonProps } from '../ui/button';
const RequiredLoginButton = ({
  children,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  const { isLoggedIn, handleConnect } = useAuthentication();
  const handleClick = (e: any) => {
    if (isLoggedIn && props.onClick) {
      props.onClick(e);
    } else {
      handleConnect();
    }
  };
  return (
    <Button {...props} onClick={(e) => handleClick(e)}>
      {children}
    </Button>
  );
};

export default RequiredLoginButton;
