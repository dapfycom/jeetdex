'use client';
import { Button } from '@/components/ui/button';
import { interactions } from '@/services/sc';

const Kaka = () => {
  const handle = async () => {
    interactions.wrapEGLDShard0.EGLDPayment({
      functionName: 'swap',
      value: 1
    });
  };
  return (
    <div>
      <h1>Template dApp Next.js</h1>
      <p className='text-gray-400'>
        The{' '}
        <a
          href='https://www.npmjs.com/package/@multiversx/sdk-dapp'
          target='_blank'
          className='text-gray-400 underline decoration-dotted hover:decoration-solid'
        >
          sdk-dapp
        </a>{' '}
        <Button onClick={handle}>handle</Button>
      </p>
    </div>
  );
};

export default Kaka;
