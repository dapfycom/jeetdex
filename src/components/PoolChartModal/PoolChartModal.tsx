import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

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
}

const PoolChartModal = ({ isOpen, toggleOpen }: IProps) => {
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
      <DialogContent>
        <div className='min-h-[400px]'>
          <ChartCard />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PoolChartModal;
