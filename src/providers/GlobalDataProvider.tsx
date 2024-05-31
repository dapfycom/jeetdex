'use client';
import { setGlobalData } from '@/redux/dapp/dapp-slice';
import { Fragment, PropsWithChildren, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const GlobalDataProvider = ({
  children,
  data
}: PropsWithChildren<{ data: any }>) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setGlobalData(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return <Fragment>{children}</Fragment>;
};

export default GlobalDataProvider;
