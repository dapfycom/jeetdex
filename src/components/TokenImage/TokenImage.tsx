import { LpTokenImageV2 } from '@/components/LpTokenImage/LpTokenImage';
import useGetElrondToken from '@/hooks/useGetElrondToken';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

interface IProps {
  tokenI?: string;
  src?: string;
  size: number;
  alt?: string;
  className?: string;
}
const TokenImage = ({ tokenI, src, alt = '', size }: IProps) => {
  const { elrondToken, isLoading } = useGetElrondToken(
    src ? null : (tokenI as string)
  );

  if (src) {
    return (
      <div className='flex'>
        <Image src={src} width={size} height={size} alt={alt} />
      </div>
    );
  }

  if (!elrondToken || !elrondToken.assets?.svgUrl) {
    return (
      <div className='flex'>
        <Image
          src='/images/token-placehodler.png'
          width={size || 40}
          height={size * 1.2 || 48}
          alt={alt}
        />
      </div>
    );
  }

  return (
    <div className='flex'>
      {isLoading ? (
        <Loader2 className='animate-spin' />
      ) : (
        <div className='flex items-center'>
          {elrondToken.name.slice(-2).toLocaleLowerCase() === 'lp' ? (
            <LpTokenImageV2 lpToken={elrondToken} size={size} />
          ) : (
            <div className={`w-[${size}] h-[${size}] rounded-full`}>
              <Image
                width={size}
                height={size}
                src={elrondToken.assets.svgUrl}
                alt={elrondToken.ticker}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TokenImage;

export const TokenImageSRC = ({ src, alt = '', size, className }: IProps) => {
  console.log(src);

  return (
    <>
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className={className}
        />
      ) : (
        <FontAwesomeIcon
          icon={faCircleQuestion}
          style={{
            width: size,
            height: size
          }}
        />
      )}
    </>
  );
};
