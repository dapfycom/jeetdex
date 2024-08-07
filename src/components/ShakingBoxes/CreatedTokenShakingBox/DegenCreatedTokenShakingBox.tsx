'use client';
import { useFetchExtraCoinInfo } from '@/app/degen/hooks';
import { Button } from '@/components/ui/button';
import { tokensID } from '@/config';
import { generateLightColor } from '@/utils/general';
import { formatTokenI } from '@/utils/mx-utils';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { adaptPairCreatedData } from './adapter';

const DegenCreatedTokenShakingBox = () => {
  const [shake, setShake] = useState(false);
  const [bgColor, setBgColor] = useState(generateLightColor());

  const [index, setIndex] = useState(0);

  const { coinsInfo } = useFetchExtraCoinInfo(100);
  const data = coinsInfo?.filter((coin) => coin.identifier.includes('-'));

  const adaptedData =
    data?.map((coin) => {
      return adaptPairCreatedData({
        address: coin.owner.address,
        caller: coin.owner.username,
        date: coin.createdAt,
        firstToken: coin.identifier,
        secondToken: tokensID.wegld,
        txHash: ''
      });
    }) || [];

  useEffect(() => {
    // Función para simular la llegada de nuevos valores con un delay
    const interval = setInterval(() => {
      setShake(true);
      setTimeout(() => setShake(false), 500); // Duración del shake, ajusta según tu configuración
      setBgColor(generateLightColor()); // Cambiar el color de fondo

      setIndex((prevIndex) => (prevIndex + 1) % adaptedData.length);
    }, 5000); // Ajusta el delay entre cada nuevo valor

    return () => clearInterval(interval);
  }, [adaptedData.length]);

  const currentValue = adaptedData[index];
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

export default DegenCreatedTokenShakingBox;
