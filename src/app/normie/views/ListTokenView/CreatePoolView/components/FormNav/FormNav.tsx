'use client';
import { useAppDispatch } from '@/hooks';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setActiveStep, stepsType } from '../../../utils/slice';

interface FormNavProps {
  currentStep: stepsType;
}

const NavOrder: stepsType[] = ['create-pool', 'set-lp', 'set-roles'];

const FormNav = ({ currentStep }: FormNavProps) => {
  const dispatch = useAppDispatch();

  const handleNext = () => {
    let nextStep = currentStep;
    const currentIndex = NavOrder.indexOf(currentStep);
    if (currentIndex < NavOrder.length - 1) {
      nextStep = NavOrder[currentIndex + 1];
    }
    dispatch(setActiveStep(nextStep));
  };

  const handleBack = () => {
    let nextStep = currentStep;
    const currentIndex = NavOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      nextStep = NavOrder[currentIndex - 1];
    }
    dispatch(setActiveStep(nextStep));
  };

  return (
    <div className='mt-8 flex justify-between'>
      <div
        onClick={handleBack}
        className={
          'flex items-center gap-2 cursor-pointer hover:font-bold ' +
          (currentStep === NavOrder[0] ? 'opacity-70 cursor-not-allowed' : '')
        }
      >
        <FontAwesomeIcon icon={faArrowLeft} className='w-4 h-4' /> Back
      </div>

      <div
        onClick={handleNext}
        className={
          'flex items-center gap-2 cursor-pointer hover:font-bold ' +
          (currentStep === NavOrder[NavOrder.length - 1]
            ? 'opacity-70 cursor-not-allowed'
            : '')
        }
      >
        Next <FontAwesomeIcon icon={faArrowRight} className='w-4 h-4' />
      </div>
    </div>
  );
};

export default FormNav;
