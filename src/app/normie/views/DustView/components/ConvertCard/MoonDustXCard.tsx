'use client';
import {
  selectToToken,
  selectToTokenDust
} from '@/app/normie/views/DustView/lib/dust-slice';
import { useGetAllowedOutputTokens } from '@/app/normie/views/DustView/lib/hooks';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import useGetMultipleElrondTokens from '@/hooks/useGetMultipleElrondTokens';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { formatTokenI } from '@/utils/mx-utils';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import ConvertButton from './ConvertButton/ConvertButton';
import ConvertInfo from './ConvertInfo/ConvertInfo';
import SelectAllTokens from './SelectAllTokens/SelectAllTokens';
const SelectTokens = dynamic(() => import('./SelectTokens/SelectTokens'), {
  ssr: false
});
const MoonDustXCard = () => {
  const dispatch = useAppDispatch();
  const selectedToToken = useAppSelector(selectToTokenDust);
  const { outputTokens: toTokensToConvert } = useGetAllowedOutputTokens();
  const { tokens } = useGetMultipleElrondTokens(toTokensToConvert);

  return (
    <Card className='text-left w-full max-w-[650px] bg-[#1C243E]'>
      <CardHeader>
        <div className='flex justify-between  items-center flex-col md:flex-row'>
          <CardTitle className='mb-3'>Convert dust into:</CardTitle>
          <div className='flex justify-center md:justify-end flex-wrap gap-4'>
            <Select
              value={selectedToToken}
              onValueChange={(value) => dispatch(selectToToken(value))}
            >
              <SelectTrigger className='w-[180px] bg-[#0b102280]'>
                <SelectValue placeholder='Select a fruit' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {toTokensToConvert.map((tokenI) => {
                    const elrondToken = tokens?.find(
                      (t) => t.identifier === tokenI
                    );
                    return (
                      <SelectItem value={tokenI} key={tokenI}>
                        {' '}
                        <div className='flex items-center gap-3'>
                          {elrondToken?.assets?.svgUrl && (
                            <Image
                              src={elrondToken.assets.svgUrl}
                              alt=''
                              width={26}
                              height={26}
                            />
                          )}
                          {formatTokenI(tokenI)}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className='space-y-2 px-3'>
        <div className='flex flex-col  md:px-3'>
          <SelectTokens />
          <div className='flex w-full my-4'>
            <SelectAllTokens />
          </div>

          <ConvertInfo />
        </div>
      </CardContent>
      <CardFooter>
        <ConvertButton />
      </CardFooter>
    </Card>
  );
};

export default MoonDustXCard;
