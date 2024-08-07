import SlippageModal from '@/app/normie/views/SwapView/commons/SwapCard/commons/ChangeSlippageModal/SliipageModal';
import { DialogTrigger } from '@radix-ui/react-dialog';

const SetSlippageButton = () => {
  return (
    <SlippageModal>
      <DialogTrigger asChild>
        <button
          className='text-xs py-1 px-2 rounded text-gray-400 hover:bg-gray-800 bg-[#151e29]'
          type='button'
          aria-haspopup='dialog'
          aria-expanded='false'
          aria-controls='radix-:r58:'
          data-state='closed'
        >
          Set max slippage
        </button>
      </DialogTrigger>
    </SlippageModal>
  );
};

export default SetSlippageButton;
