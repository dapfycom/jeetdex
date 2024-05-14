import logo from '@/assets/images/logo.jpg';
import { cn } from '@/lib/utils';
import Image from 'next/image';
const Logo = ({ className = '' }) => {
  return (
    <Image
      src={logo}
      alt='Jeedex logo'
      className={cn('w-10 h-10', className)}
    />
  );
};

export default Logo;
