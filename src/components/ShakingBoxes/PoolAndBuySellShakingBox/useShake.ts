import { fetchEventsApiData } from '@/services/rest/events';
import { socket } from '@/services/ws';
import {
  IPairCreatedEventData,
  ISwapInEventData
} from '@/types/eventsApi.types';
import { generateLightColor } from '@/utils/general';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { adaptPairCreatedData } from '../CreatedTokenShakingBox/adapter';
import { adaptSwapInEventData } from '../SellBuyTokenShakingBox/adapter';

const useShake = () => {
  const [shake, setShake] = useState(false);
  const [bgColor, setBgColor] = useState(generateLightColor());
  const [swapInTxEvent, setSwapInTxEvent] = useState<ISwapInEventData | null>(
    null
  );
  const [index, setIndex] = useState(0);

  const [type, setType] = useState<'pool' | 'tx'>('pool');

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
        setType('tx');

        setTimeout(() => {
          setType('pool');
        }, 10000);
      }
    );

    return () => {
      socket.off('swapInTransaction');
    };
  }, []);

  const { data } = useSWR<IPairCreatedEventData[]>(
    '/pairsCreated',
    fetchEventsApiData
  );

  const adaptedData =
    data?.map((creation) => {
      return adaptPairCreatedData(creation);
    }) || [];

  useEffect(() => {
    // Función para simular la llegada de nuevos valores con un delay
    const interval = setInterval(() => {
      setShake(true);
      setTimeout(() => setShake(false), 500); // Duración del shake, ajusta según tu configuración
      setBgColor(generateLightColor()); // Cambiar el color de fondo

      setIndex((prevIndex) => (prevIndex + 1) % adaptedData.length);
    }, 10000); // Ajusta el delay entre cada nuevo valor

    return () => clearInterval(interval);
  }, [adaptedData.length]);

  const poolValue = adaptedData[index];
  const txValue: {
    user: string;
    amount: string;
    token: string;
    type: string;
    address: string;
    username: string;
  } = adaptSwapInEventData(swapInTxEvent);

  return { shake, bgColor, type, poolValue, txValue };
};

export default useShake;