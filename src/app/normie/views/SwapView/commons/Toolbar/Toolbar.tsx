import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/hooks';
import { faChartColumn, faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OnToggleCharts, onToggleChats } from '../../lib/swap-slice';
import SlippageModal from '../SwapCard/commons/ChangeSlippageModal/SliipageModal';
import MoreOptions from '../SwapCard/commons/MoreOptions/MoreOptions';
import { CommandDialogDemo } from './SearchTokenDialog';

const Toolbar = ({
  pairSelected
}: {
  pairSelected: { firstToken: string; secondToken: string; address: string };
}) => {
  const dispatch = useAppDispatch();
  return (
    <div className='mb-3 flex justify-between items-center'>
      <CommandDialogDemo />
      <div className='w-full flex justify-end gap-3'>
        <Button
          className='px-[8px] h-[26.8px] text-gray-700 text-[12px] '
          onClick={() => dispatch(OnToggleCharts())}
          size='icon'
        >
          <FontAwesomeIcon icon={faChartColumn} className='w-[12px] h-[12px]' />
        </Button>
        <Button
          className='px-[8px] h-[26.8px] text-gray-700 text-[12px] '
          onClick={() => dispatch(onToggleChats())}
          size='icon'
        >
          <FontAwesomeIcon icon={faMessage} className='w-[12px] h-[12px]' />
        </Button>
        <SlippageModal />
        <MoreOptions
          token1={pairSelected?.firstToken}
          token2={pairSelected?.secondToken}
        />
      </div>
    </div>
  );
};

export default Toolbar;
