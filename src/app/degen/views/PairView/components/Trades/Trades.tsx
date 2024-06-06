import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { explorerAddress } from '@/config/index';
import { getContrastColor, stringToColor } from '@/lib/utils';
import { formatBigNumber } from '@/utils/numbers';

const invoices = [
  {
    account: 'erd34e5fg',
    type: 'sell',
    tokenA: '1.35064',
    tokenB: '1.35064',
    date: '5h ago',
    transaction: '3afegb324c6'
  },
  {
    account: 'erd312faa',
    type: 'sell',
    tokenA: '1.45122',
    tokenB: '1.45064',
    date: '8h ago',
    transaction: '4bfegb324d7'
  },
  {
    account: 'erd39ca2d3',
    type: 'sell',
    tokenA: '1.35264',
    tokenB: '1.35364',
    date: '14h ago',
    transaction: '5cfgdb325e8'
  },
  {
    account: 'btd56f7gh',
    type: 'buy',
    tokenA: '1.36000',
    tokenB: '1.36000',
    date: '15h ago',
    transaction: '6dhfec326f9'
  },
  {
    account: 'erd98aff64',
    type: 'buy',
    tokenA: '1.36020',
    tokenB: '1.36020',
    date: '16h ago',
    transaction: '7eigfd327g1'
  },
  {
    account: 'erd36e5fa',
    type: 'sell',
    tokenA: '200.064',
    tokenB: '1.35064',
    date: '25h ago',
    transaction: '8fjheg328h2'
  },
  {
    account: 'clm67h8ij',
    type: 'buy',
    tokenA: '1.35164',
    tokenB: '1.35064',
    date: '26h ago',
    transaction: '9gkifj329i3'
  }
];

export default function Trades() {
  return (
    <Table className='text-sm'>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Account</TableHead>
          <TableHead className='text-center t'>Type</TableHead>
          <TableHead className='text-center'>JEET</TableHead>
          <TableHead className='text-center'>MOGE</TableHead>
          <TableHead className='text-center'>Date</TableHead>
          <TableHead className='text-right'>Transaction</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((trade) => (
          <TableRow key={trade.account}>
            <TableCell>
              <Badge
                style={{
                  background: stringToColor(trade.account),
                  color: getContrastColor(stringToColor(trade.account))
                }}
                className='text-gray-500'
              >
                {trade.account}
              </Badge>
            </TableCell>
            <TableCell className='text-center'>{trade.type}</TableCell>
            <TableCell className='text-center'>
              {formatBigNumber(trade.tokenA)}
            </TableCell>
            <TableCell className='text-center'>
              {formatBigNumber(trade.tokenB)}
            </TableCell>
            <TableCell className='text-center'>{trade.date}</TableCell>

            <TableCell className='text-right'>
              <a
                href={explorerAddress}
                target='_blank'
                rel='noopener noreferrer'
              >
                {trade.transaction}
              </a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
