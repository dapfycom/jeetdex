import {
  IconDefinition,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

interface ActionsBoxProps {
  icon: IconDefinition;
  title: string;
  description: string;
  path: string;
  completed?: boolean;
}

const ActionsBox = ({
  icon,
  description,
  title,
  path,
  completed
}: ActionsBoxProps) => {
  return (
    <Link href={path}>
      <div className='relative justify-center items-center rounded-xl border border-cyan-50/20 min-h-[200px] w-full flex flex-col hover:bg-gray-700/40 px-2'>
        {completed && (
          <FontAwesomeIcon
            icon={faCheckCircle}
            className='w-[50px] h-[50px] absolute right-3 top-3 text-green-500'
          />
        )}
        <FontAwesomeIcon
          icon={icon}
          className='w-[40px] h-[40px] sm:w-[50px] sm:h-[50px]'
        />

        <div className='text-center mt-3'>
          <p className='text-md sm:text-lg text-gray-500'>{title}</p>
          <p className='text-xs sm:text-sm text-muted-foreground'>
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ActionsBox;
