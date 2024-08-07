import { IPoolPair } from '@/app/normie/views/PoolsView/utils/types';
import useGetDefaultPool from '@/hooks/useGetDefaultPool';
import ChartCard from './ChartCard';

interface IProps {
  poolPair?: IPoolPair;
}

const NormieChart = ({ poolPair }: IProps) => {
  const pool = useGetDefaultPool(poolPair);

  return (
    <ChartCard
      firstToken={pool?.firstToken}
      firstTokenJeetdexPrice={pool?.firstTokenJeetdexPrice}
      firstTokenReserve={pool?.firstTokenReserve}
      mode='normie'
    />
  );
};

export default NormieChart;
