import { network } from '@/config';
import useGetElrondToken from '@/hooks/useGetElrondToken';
import { fetchElrondData } from '@/services/rest/elrond';
import { formatAddress, formatNumber } from '@/utils/mx-utils';
import BigNumber from 'bignumber.js';
import useSWR from 'swr';
import { getBalancePercentage } from './helper';

const HoldersList = ({ tokenIdentifier }: { tokenIdentifier?: string }) => {
  const { data: holders } = useSWR<
    {
      address: string;
      balance: string;
    }[]
  >(
    tokenIdentifier ? `/tokens/${tokenIdentifier}/accounts` : null,
    fetchElrondData
  );
  const { elrondToken } = useGetElrondToken(tokenIdentifier);
  console.log(elrondToken);

  const totalBalance = new BigNumber(elrondToken?.initialMinted || 0).minus(
    elrondToken?.burnt || 0
  );

  if (!holders) return null;
  return (
    <div className='text-left'>
      <div className='text-lg mb-2'>Holder distribution</div>
      <div className='flex flex-col gap-1'>
        {holders.map((h, i) => {
          const percent = getBalancePercentage(
            holders,
            h.address,
            totalBalance.toString()
          );
          return (
            <div key={h.address} className='text-gray-400 text-sm'>
              <div className='flex w-full justify-between'>
                <a
                  href={`${network.explorerAddress}/accounts/${h.address}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {i + 1}. {formatAddress(h.address)}
                </a>
                {elrondToken && <div>{formatNumber(percent.toNumber())}%</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HoldersList;
