import logo from '@/assets/images/logo.png';
import { cn } from '@/lib/utils';
import Image from 'next/image';
const Logo = ({ className = '' }) => {
  return (
    <div>
      <Image
        src={logo}
        alt='Jeedex logo'
        className={cn('w-14 h-14', className)}
        quality={1}
      />
    </div>
  );
};

export default Logo;
