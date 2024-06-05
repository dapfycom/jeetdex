import { useAuthentication } from '@/hooks';
import React, { ReactElement, cloneElement } from 'react';

interface RequiredLoginWrapperProps {
  children: ReactElement;
}

const RequiredLoginWrapper: React.FC<RequiredLoginWrapperProps> = ({
  children
}) => {
  const { isLoggedIn, handleConnect } = useAuthentication();

  const handleClick = (e: React.MouseEvent) => {
    if (isLoggedIn && children.props.onClick) {
      children.props.onClick(e);
    } else {
      handleConnect();
    }
  };

  return cloneElement(children, {
    ...children.props,
    onClick: handleClick
  });
};

export default RequiredLoginWrapper;
