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
import { useAppSelector } from '@/hooks';
import useUpdateUrlParams from '@/hooks/useUpdateUrlParams';
import { selectGlobalData } from '@/redux/dapp/dapp-slice';
import { Command, useCommandState } from 'cmdk';

export function CommandDialogDemo() {
  const [searchVal, setSearchVal] = React.useState('');
  const allPools = useAppSelector(selectGlobalData).pools;
  const { updateParams } = useUpdateUrlParams(['swap']);

  const inputRef = React.useRef<any>();
  const handleSelectToken = (value: string) => {
    const valueIdentifier = value.split(':')[1];
    const parts = valueIdentifier.split('-');
    const ticker = parts[0].toUpperCase();

    const tokenIdentifier = ticker + '-' + parts[1];

    updateParams('swap', tokenIdentifier);
    setSearchVal('');
  };

  const handleOnBlur = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      <Command className='relative w-full border-1 border-[#30364F] bg-[#1C243E] text-[#C4C4C4] placeholder-[#C4C4C4] '>
        <CommandInput
          placeholder='Search a token ...'
          className=''
          autoFocus={true}
          value={searchVal}
          onValueChange={setSearchVal}
          ref={inputRef}
          onBlur={handleOnBlur}
        />
        <List allPools={allPools} handleSelectToken={handleSelectToken} />
      </Command>
    </>
  );
}

const List = ({ allPools, handleSelectToken }) => {
  const search = useCommandState((state) => state.search);
  if (!search) return null;

  return (
    <CommandList className='absolute bg-card w-full'>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading='Suggestions'>
        {allPools.map((pool) => {
          return (
            <SubItem
              key={pool.address}
              className='cursor-pointer'
              value={`${pool.address}:${pool.firstTokenId}`}
              onSelect={handleSelectToken}
            >
              <TokenImageSRC
                alt={pool.firstToken?.ticker}
                identifier={pool.firstTokenId}
                size={16}
                src={pool.firstToken?.assets?.svgUrl}
                className='h-4 w-4 rounded-full'
              />
              <span className='ml-2 '>{pool.firstTokenId}</span>
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
