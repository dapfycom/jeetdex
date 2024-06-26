import {
  IconDefinition,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ActionsBoxProps {
  icon: IconDefinition;
  title: string;
  completed?: boolean;
  onclick?: () => void;
}

const ActionsBox = ({ icon, onclick, title, completed }: ActionsBoxProps) => {
  return (
    <div
      className='relative justify-center items-center rounded-xl border border-cyan-50/20 min-h-[200px] w-full flex flex-col hover:bg-gray-700/40 px-2 cursor-pointer'
      onClick={onclick}
    >
      {completed && (
        <FontAwesomeIcon
          icon={faCheckCircle}
          className='w-[50px] h-[50px] absolute right-3 top-3 text-green-500'
        />
      )}
      <FontAwesomeIcon
        icon={icon}
        className='w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] text-primary'
      />

      <div className='text-center mt-3'>
        <p className='text-md sm:text-lg text-gray-500'>{title}</p>
      </div>
    </div>
  );
};

export default ActionsBox;
