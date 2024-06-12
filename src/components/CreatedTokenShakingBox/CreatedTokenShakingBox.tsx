'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

// Datos de ejemplo extendidos
const values = [
  { user: 'lobby', amount: 0.012, token: 'JEETDEX', type: 'sold' },
  { user: 'john', amount: 0.034, token: 'KAKA', type: 'bought' },
  { user: 'doe', amount: 0.056, token: 'FOO', type: 'sold' },
  { user: 'alice', amount: 0.078, token: 'BAR', type: 'bought' },
  { user: 'bob', amount: 0.09, token: 'BAZ', type: 'sold' },
  { user: 'charlie', amount: 0.012, token: 'QUX', type: 'bought' },
  { user: 'david', amount: 0.015, token: 'QUUX', type: 'sold' },
  { user: 'eve', amount: 0.038, token: 'CORGE', type: 'bought' },
  { user: 'frank', amount: 0.045, token: 'GRAULT', type: 'sold' },
  { user: 'grace', amount: 0.067, token: 'GARPLY', type: 'bought' },
  { user: 'heidi', amount: 0.073, token: 'WALDO', type: 'sold' },
  { user: 'ivan', amount: 0.019, token: 'FRED', type: 'bought' },
  { user: 'judy', amount: 0.021, token: 'PLUGH', type: 'sold' },
  { user: 'mallory', amount: 0.024, token: 'XYZZY', type: 'bought' },
  { user: 'oscar', amount: 0.026, token: 'THUD', type: 'sold' },
  { user: 'peggy', amount: 0.032, token: 'QUX', type: 'bought' },
  { user: 'trent', amount: 0.035, token: 'CORGE', type: 'sold' },
  { user: 'victor', amount: 0.037, token: 'GRAULT', type: 'bought' },
  { user: 'walter', amount: 0.041, token: 'GARPLY', type: 'sold' },
  { user: 'alice', amount: 0.044, token: 'WALDO', type: 'bought' },
  { user: 'bob', amount: 0.047, token: 'FRED', type: 'sold' },
  { user: 'charlie', amount: 0.049, token: 'PLUGH', type: 'bought' },
  { user: 'david', amount: 0.053, token: 'XYZZY', type: 'sold' },
  { user: 'eve', amount: 0.057, token: 'THUD', type: 'bought' },
  { user: 'frank', amount: 0.062, token: 'FOO', type: 'sold' },
  { user: 'grace', amount: 0.065, token: 'BAR', type: 'bought' },
  { user: 'heidi', amount: 0.068, token: 'BAZ', type: 'sold' },
  { user: 'ivan', amount: 0.071, token: 'QUX', type: 'bought' },
  { user: 'judy', amount: 0.074, token: 'QUUX', type: 'sold' },
  { user: 'mallory', amount: 0.077, token: 'CORGE', type: 'bought' },
  { user: 'oscar', amount: 0.081, token: 'GRAULT', type: 'sold' },
  { user: 'peggy', amount: 0.084, token: 'GARPLY', type: 'bought' },
  { user: 'trent', amount: 0.087, token: 'WALDO', type: 'sold' },
  { user: 'victor', amount: 0.091, token: 'FRED', type: 'bought' },
  { user: 'walter', amount: 0.094, token: 'PLUGH', type: 'sold' },
  { user: 'alice', amount: 0.096, token: 'XYZZY', type: 'bought' },
  { user: 'bob', amount: 0.099, token: 'THUD', type: 'sold' },
  { user: 'charlie', amount: 0.102, token: 'JEET', type: 'bought' },
  { user: 'david', amount: 0.106, token: 'KAKA', type: 'sold' },
  { user: 'eve', amount: 0.109, token: 'FOO', type: 'bought' },
  { user: 'frank', amount: 0.113, token: 'BAR', type: 'sold' },
  { user: 'grace', amount: 0.116, token: 'BAZ', type: 'bought' },
  { user: 'heidi', amount: 0.119, token: 'QUX', type: 'sold' },
  { user: 'ivan', amount: 0.121, token: 'QUUX', type: 'bought' },
  { user: 'judy', amount: 0.124, token: 'CORGE', type: 'sold' },
  { user: 'mallory', amount: 0.127, token: 'GRAULT', type: 'bought' },
  { user: 'oscar', amount: 0.131, token: 'GARPLY', type: 'sold' },
  { user: 'peggy', amount: 0.134, token: 'WALDO', type: 'bought' },
  { user: 'trent', amount: 0.137, token: 'FRED', type: 'sold' }
];

// Función para generar un color claro aleatorio
const generateLightColor = () => {
  const r = Math.floor(Math.random() * 156) + 100; // Valores entre 100 y 255 para asegurar colores claros
  const g = Math.floor(Math.random() * 156) + 100;
  const b = Math.floor(Math.random() * 156) + 100;
  return `rgb(${r}, ${g}, ${b})`;
};

const CreatedTokenShakingBox = () => {
  const [index, setIndex] = useState(0);
  const [shake, setShake] = useState(false);
  const [bgColor, setBgColor] = useState(generateLightColor());
  useEffect(() => {
    // Función para simular la llegada de nuevos valores con un delay
    const interval = setInterval(() => {
      setShake(true);
      setTimeout(() => setShake(false), 500); // Duración del shake, ajusta según tu configuración
      setBgColor(generateLightColor()); // Cambiar el color de fondo

      setIndex((prevIndex) => (prevIndex + 1) % values.length);
    }, 10000); // Ajusta el delay entre cada nuevo valor

    return () => clearInterval(interval);
  }, []);

  const currentValue = values[index];

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
        <div>{`${currentValue.user} created ${currentValue.token} on 06/11/24 `}</div>
      </div>
    </Button>
  );
};

export default CreatedTokenShakingBox;
