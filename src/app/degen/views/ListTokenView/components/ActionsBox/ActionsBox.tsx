import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

interface ActionsBoxProps {
  icon: IconDefinition;
  title: string;
  description: string;
  path: string;
}

const ActionsBox = ({ icon, description, title, path }: ActionsBoxProps) => {
  return (
    <Link href={path}>
      <div className=' justify-center items-center rounded-xl border border-cyan-50/20 min-h-[200px] w-full flex flex-col hover:bg-gray-700/40'>
        <FontAwesomeIcon icon={icon} className='w-[50px]' />

        <div className='text-center mt-3'>
          <p className='text-lg text-gray-500'>{title}</p>
          <p className='text-sm text-muted-foreground'>{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default ActionsBox;
