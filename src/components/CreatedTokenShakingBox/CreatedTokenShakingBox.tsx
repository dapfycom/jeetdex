'use client';
import { fetchEventsApiData } from '@/services/rest/events';
import { socket } from '@/services/ws';
import { IPairCreatedEventData } from '@/types/eventsApi.types';
import { generateLightColor } from '@/utils/general';
import { formatTokenI } from '@/utils/mx-utils';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Button } from '../ui/button';
import { adaptPairCreatedData } from './adapter';

const CreatedTokenShakingBox = () => {
  const [shake, setShake] = useState(false);
  const [bgColor, setBgColor] = useState(generateLightColor());
  const [pairCreatedData, setPairCreatedData] =
    useState<IPairCreatedEventData | null>(null);

  useEffect(() => {
    socket.on(
      'enablePair',
      ({ message: data }: { message: IPairCreatedEventData }) => {
        setShake(true);
        setTimeout(() => setShake(false), 500); // Duración del shake, ajusta según tu configuración
        setBgColor(generateLightColor());
        setPairCreatedData(data);
      }
    );

    return () => {
      socket.off('enablePair');
    };
  }, []);

  const { data } = useSWR<IPairCreatedEventData>(
    '/lastPairCreated',
    fetchEventsApiData
  );
  console.log(data);

  const currentValue = adaptPairCreatedData(pairCreatedData || data);

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
        <Link
          href={`/profile/${currentValue.address}`}
          className='hover:text-blue-700 hover:font-bold'
        >
          {currentValue.user}
        </Link>
        created
        <Link
          href={`/?swap=${currentValue.token}`}
          className='hover:text-blue-700 hover:font-bold'
        >
          {formatTokenI(currentValue.token)}
        </Link>
        <div>{`on ${new Date(currentValue.date).toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric'
        })}`}</div>
      </div>
    </Button>
  );
};

export default CreatedTokenShakingBox;
