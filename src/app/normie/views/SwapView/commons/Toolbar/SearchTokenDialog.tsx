'use client';

import * as React from 'react';

import { TokenImageSRC } from '@/components/TokenImage/TokenImage';
import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import { useAppSelector } from '@/hooks';
import useUpdateUrlParams from '@/hooks/useUpdateUrlParams';
import { selectGlobalData } from '@/redux/dapp/dapp-slice';

export function CommandDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const allPools = useAppSelector(selectGlobalData).pools;
  const { updateParams } = useUpdateUrlParams(['swap']);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelectToken = (value: string) => {
    const valueIdentifier = value.split(':')[1];
    const parts = valueIdentifier.split('-');
    const ticker = parts[0].toUpperCase();

    const tokenIdentifier = ticker + '-' + parts[1];

    updateParams('swap', tokenIdentifier);
    setOpen(false);
  };

  return (
    <>
      <Button
        className='text-sm gap-5'
        size='sm'
        onClick={() => setOpen((open) => !open)}
      >
        Search token{' '}
        <kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-gray-700 px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 '>
          <span className='text-xs'>⌘</span>J
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder='Search a token by ticker or LP contract' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading='Suggestions'>
            {allPools.map((pool) => {
              return (
                <CommandItem
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
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
