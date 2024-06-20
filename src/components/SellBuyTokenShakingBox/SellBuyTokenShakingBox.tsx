'use client';
import { fetchEventsApiData } from '@/services/rest/events';
import { socket } from '@/services/ws/index';
import { ISwapInEventData } from '@/types/eventsApi.types';
import { generateLightColor } from '@/utils/general';
import { formatNumber, formatTokenI } from '@/utils/mx-utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Button } from '../ui/button';
import { adaptSwapInEventData } from './adapter';

const SellBuyTokenShakingBox = () => {
  const [shake, setShake] = useState(false);
  const [bgColor, setBgColor] = useState(generateLightColor());
  const [swapInTxEvent, setSwapInTxEvent] = useState<ISwapInEventData | null>(
    null
  );

  useEffect(() => {
    socket.on(
      'swapInTransaction',
      ({
        message: data
      }: {
        message: {
          caller: string;
          tokenIn: string;
          tokenAmountIn: string;
          tokenOut: string;
          tokenAmountOut: string;
          fee: string;
          tokenInReserve: string;
          tokenOutReserve: string;
          block: number;
          epoch: number;
          timestamp: number;
        };
      }) => {
        setShake(true);
        setTimeout(() => setShake(false), 500); // Duración del shake, ajusta según tu configuración
        setBgColor(generateLightColor());
        setSwapInTxEvent(data);
      }
    );

    return () => {
      socket.off('swapInTransaction');
    };
  }, []);

  const { data } = useSWR<ISwapInEventData>('/lastSwapTx', fetchEventsApiData);

  const currentValue: {
    user: string;
    amount: string;
    token: string;
    type: string;
  } = adaptSwapInEventData(swapInTxEvent || data);

  if (!currentValue) return null;

  return (
    <Button
      className={`flex items-center gap-2 font-normal ${
        shake ? 'animate-shake' : ''
      }`}
      style={{ backgroundColor: bgColor }}
      asChild
    >
      <div>
        <Image
          alt=''
          src={'/assets/img/logo-jeeter.png'}
          width={20}
          height={20}
          className='rounded-full w-5 h-5'
        />
        <div>{`${currentValue.user} ${currentValue.type} ${formatNumber(
          currentValue.amount
        )} JEET of ${formatTokenI(currentValue.token)}`}</div>
      </div>
    </Button>
  );
};

export default SellBuyTokenShakingBox;
