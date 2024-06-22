import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import { IPoolPair } from '@/app/normie/views/PoolsView/utils/types';
import ChartCard from '@/components/ChartCard/ChartCard';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../ui/tooltip';

interface IProps {
  isOpen: boolean;
  toggleOpen: () => void;
  poolPair: IPoolPair;
}

const PoolChartModal = ({ isOpen, toggleOpen, poolPair }: IProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen}>
      <DialogTrigger asChild>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild></TooltipTrigger>
            <TooltipContent>
              <p>AView Pool charts</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[1200px] px-4 pt-10 '>
        <div className='h-full sm:min-h-[600px]'>
          <ChartCard poolPair={poolPair} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PoolChartModal;
