'use client';

import * as React from 'react';

import { TokenImageSRC } from '@/components/TokenImage/TokenImage';
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import { tokensID } from '@/config';
import { useAppSelector } from '@/hooks';
import useGetMultipleElrondTokens from '@/hooks/useGetMultipleElrondTokens';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import useUpdateUrlParams from '@/hooks/useUpdateUrlParams';
import { selectGlobalData } from '@/redux/dapp/dapp-slice';
import { IElrondToken } from '@/types/scTypes';
import { Command } from 'cmdk';
import { useGetSwapbleAggregatorTokens } from '../../lib/hooks';

export function CommandDialogDemo() {
  const [searchVal, setSearchVal] = React.useState('');
  const allPools = useAppSelector(selectGlobalData).pools;
  const [openTokensList, setOpenTokensList] = React.useState<boolean>(false);
  const { updateParams, currentParams } = useUpdateUrlParams(['swap', 'tab']);

  const isInInfo = currentParams[1] === 'info';
  const listOfTokens: (IElrondToken & { address?: string })[] = allPools.map(
    (p) => {
      return {
        address: p.address,
        ...p.firstToken
      };
    }
  );

  const { ashTokens } = useGetSwapbleAggregatorTokens();
  const tokensToSwap = [tokensID.egld, ...ashTokens.map((t) => t.id)];
  const { tokens } = useGetMultipleElrondTokens(tokensToSwap);

  const finalTokens = isInInfo
    ? [...listOfTokens]
    : [...listOfTokens, ...tokens];

  const handleSelectToken = (value: string) => {
    const valueIdentifier = value.split(':')[0];
    const parts = valueIdentifier.split('-');
    const ticker = parts[0].toUpperCase();
    let tokenIdentifier = ticker;
    if (ticker !== tokensID.egld) {
      tokenIdentifier += '-' + parts[1];
    }

    updateParams('swap', tokenIdentifier);
    setSearchVal('');
    setOpenTokensList(false);
  };

  return (
    <>
      <Command className='relative w-full border-1 border-[#30364F] bg-[#1C243E] text-[#C4C4C4] placeholder-[#C4C4C4] '>
        <CommandInput
          placeholder='Search a token ...'
          className=''
          value={searchVal}
          onValueChange={setSearchVal}
          onFocus={() => {
            console.log('focus');

            setOpenTokensList(true);
          }}
        />
        <List
          tokens={finalTokens}
          handleSelectToken={handleSelectToken}
          openTokensList={openTokensList}
          setOpenTokensList={setOpenTokensList}
        />
      </Command>
    </>
  );
}

const List = ({
  tokens,
  handleSelectToken,
  openTokensList,
  setOpenTokensList
}: {
  tokens: (IElrondToken & { address?: string })[];
  handleSelectToken: (string) => void;
  openTokensList: boolean;
  setOpenTokensList: (v: boolean) => void;
}) => {
  const ref = React.useRef();
  useOnClickOutside(ref, () => setOpenTokensList(false));

  if (!openTokensList) return null;

  return (
    <CommandList className='absolute bg-card w-full z-10' ref={ref}>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading='Suggestions'>
        {tokens.map((token) => {
          return (
            <SubItem
              key={token.identifier}
              className='cursor-pointer'
              value={
                token.address
                  ? `${token.identifier}:${token.address}`
                  : token.identifier
              }
              onSelect={handleSelectToken}
            >
              <TokenImageSRC
                alt={token.ticker}
                identifier={token.identifier}
                size={16}
                src={token.assets?.svgUrl}
                className='h-4 w-4 rounded-full'
              />
              <span className='ml-2 '>{token.identifier}</span>
            </SubItem>
          );
        })}
      </CommandGroup>
    </CommandList>
  );
};

const SubItem = (props) => {
  return <CommandItem {...props} />;
};
