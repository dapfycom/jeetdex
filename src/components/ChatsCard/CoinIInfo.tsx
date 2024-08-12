import useDisclosure from '@/hooks/useDisclosure';
import { textToLightColor } from '@/utils/general';
import { format, isToday } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarImage } from '../ui/avatar';

const CoinIInfo = ({
  userImage,
  userName,
  userAddress,
  coinDate,
  coinDescription,
  coinTitle,
  coinImg
}: {
  userImage: string;
  userName: string;
  userAddress: string;
  coinDate: string;
  coinDescription: string;
  coinTitle: string;
  coinImg?: string;
}) => {
  const { isOpen: isOpenImage, onToggle: onToggleImage } = useDisclosure();

  return (
    <div className={'flex items-start gap-3 p-2 w-full bg-[#2e303a]'}>
      <div className='grid gap-1  w-full'>
        <div className='flex items-center gap-1 flex-wrap'>
          <Link href={`/profile/${userAddress}`}>
            <Avatar className='border w-5 h-5'>
              <AvatarImage alt={userName} src={userImage} />
            </Avatar>
          </Link>
          <Link href={`/profile/${userAddress}`}>
            <div
              className='rounded-sm text-xs bg-lime-400/70 text-black px-1 h-[16px] flex items-center'
              style={{
                background: textToLightColor(userName)
              }}
            >
              {userName} (dev)
            </div>
          </Link>
          <div className='text-xs text-muted-foreground'>
            {isToday(new Date(coinDate))
              ? format(new Date(coinDate), 'pp')
              : format(new Date(coinDate), 'P')}
          </div>
        </div>
        <div
          className={`flex gap-2 text-gray-300 w-full ${
            isOpenImage ? 'flex-col' : ''
          }`}
        >
          {coinImg && (
            <Image
              src={coinImg}
              alt='image'
              width={100}
              height={100}
              className={`cursor-pointer ${
                isOpenImage ? 'w-full max-w-[500px] mx-auto' : ''
              }`}
              quality={100}
              onClick={onToggleImage}
            />
          )}

          <h4>{coinTitle}</h4>
          <p>{coinDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default CoinIInfo;
