import Image from 'next/image';
import heartIcon from '../../../../public/assets/img/heart.svg';

export const Footer = () => {
  return (
    <footer className='mx-auto w-full max-w-prose pb-6 pl-6 pr-6 text-center text-gray-400'>
      <div className='flex flex-col items-center text sm text-gray-400'>
        <a
          target='_blank'
          className='flex items-center text-sm hover:underline'
          href='https://www.dapfy.com/'
        >
          Made with <Image src={heartIcon} alt='love' className='mx-1' /> by the
          dapfy team
        </a>
      </div>
    </footer>
  );
};
