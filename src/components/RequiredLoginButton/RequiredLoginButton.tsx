import { useAuthentication } from '@/hooks';
import { PropsWithChildren } from 'react';
import { Button, ButtonProps } from '../ui/button';
const RequiredLoginButton = ({
  children,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  const { isLoggedIn, handleConnect } = useAuthentication();
  const handleClick = (e: any) => {
    console.log(isLoggedIn);

    if (isLoggedIn) {
      if (props.onClick) {
        props.onClick(e);
      }
    } else {
      e.stopPropagation();
      e.preventDefault();
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
