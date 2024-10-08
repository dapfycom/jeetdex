import { TokenImageSRC } from '@/components/TokenImage/TokenImage';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import useDisclosure from '@/hooks/useDisclosure';
import useGetAccountToken from '@/hooks/useGetAccountToken';
import useGetElrondToken from '@/hooks/useGetElrondToken';
import useGetMultipleElrondTokens from '@/hooks/useGetMultipleElrondTokens';
import { IElrondAccountToken, IElrondToken } from '@/types/scTypes';
import { formatBalance, formatNumber, formatTokenI } from '@/utils/mx-utils';
import { Loader, Loader2Icon } from 'lucide-react';

interface IProps {
  selectedTokenI: string;
  value: string;
  tokensIdentifiers: string[];
  isLoadingInput?: boolean;
  label: string;
  dollarValue?: string;
  onChange: (val: string, token?: IElrondToken) => void;
  onChangeToken: (t: IElrondToken) => void;

  handlePercentAmount?: (t: IElrondAccountToken, percent: number) => void;
  clear?: () => void;
  hideAmountButtons?: boolean;
}

const InputBox = ({
  selectedTokenI,
  value,
  tokensIdentifiers,
  label,
  dollarValue,
  onChange,
  onChangeToken,
  handlePercentAmount: onMax,
  clear,
  hideAmountButtons
}: IProps) => {
  const { elrondToken, isLoading } = useGetElrondToken(selectedTokenI);

  const { accountToken } = useGetAccountToken(selectedTokenI);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const { tokens, isLoading: loadingTokens } =
    useGetMultipleElrondTokens(tokensIdentifiers);

  const readOnly = !Boolean(onMax);

  return (
    <>
      <div className='flex flex-col w-full pt-2  rounded-sm bg-[#0b102280] max-w-[500px] border-[#A259FF] focus-within:border focus-within:shadow-[0px_0px_12px_6px_#A259FF33]'>
        <div className='flex flex-col'>
          <div className='flex justify-between items-start px-2 md:px-4 pb-3 gap-2'>
            <h5 className='text-xs lg:text-sm '>{label}</h5>

            {!hideAmountButtons && (
              <div className='flex items-center gap-2'>
                <div className='flex gap-2'>
                  <Button
                    variant='ghost'
                    className='px-[3px] lg:px-[6px] h-[20px]  text-[10px] lg:text-[12px]'
                    onClick={() =>
                      onMax && onMax(accountToken as IElrondAccountToken, 25)
                    }
                  >
                    25%
                  </Button>
                  <Button
                    variant='ghost'
                    className='px-[3px] lg:px-[6px] h-[20px]  text-[10px] lg:text-[12px]'
                    onClick={() =>
                      onMax && onMax(accountToken as IElrondAccountToken, 50)
                    }
                  >
                    50%
                  </Button>
                  <Button
                    variant='ghost'
                    className='px-[3px] lg:px-[6px] h-[20px]  text-[10px] lg:text-[12px]'
                    onClick={() =>
                      onMax && onMax(accountToken as IElrondAccountToken, 75)
                    }
                  >
                    75%
                  </Button>
                  <Button
                    variant='ghost'
                    className='px-[3px] lg:px-[6px] h-[20px]  text-[10px] lg:text-[12px]'
                    onClick={() =>
                      onMax && onMax(accountToken as IElrondAccountToken, 100)
                    }
                  >
                    100%
                  </Button>
                  <Button
                    className='px-[3px] lg:px-[6px] h-[20px]  text-[10px] lg:text-[12px]'
                    variant='destructive'
                    onClick={clear}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div className='w-full  rounded-2xl py-3 px-2 lg:px-4'>
            <div className=' flex justify-between w-full  '>
              <Dialog
                open={isOpen}
                onOpenChange={(open) => (open ? onOpen() : onClose())}
              >
                <DialogTrigger asChild>
                  <Button
                    variant='outline'
                    className={`ml-auto gap-2 w-fit !h-[35px] rounded-xl bg-[#1C243E] disabled:opacity-100`}
                    disabled={tokensIdentifiers.length === 0 || isLoading}
                  >
                    {isLoading ? (
                      <div className='flex px-2'>
                        <Loader2Icon className='animate-spin w-4 h-4' />
                      </div>
                    ) : (
                      <div className={`flex items-center gap-2`}>
                        <div className='w-[16px]'>
                          <TokenImageSRC
                            src={elrondToken?.assets?.svgUrl}
                            alt={elrondToken?.ticker}
                            size={16}
                            className='w-[16px] h-[16px] rounded-full'
                            identifier={elrondToken?.identifier}
                          />
                        </div>
                        <p className='text-md'>
                          {formatTokenI(elrondToken?.ticker)}
                        </p>
                      </div>
                    )}
                  </Button>
                </DialogTrigger>

                <DialogContent className='p-0 max-w-[350px]'>
                  <Command>
                    <CommandInput placeholder='Select new role token' />
                    <CommandList>
                      <CommandEmpty>
                        {' '}
                        {loadingTokens ? (
                          <div className='flex justify-center w-full'>
                            <Loader className='animate-spin' />
                          </div>
                        ) : (
                          'No tokens found.'
                        )}{' '}
                      </CommandEmpty>
                      {loadingTokens ? null : (
                        <CommandGroup>
                          {tokens.map((t) => {
                            return (
                              <CommandItem key={t.identifier}>
                                <div
                                  className='w-full h-full gap-3 cursor-pointer flex  items-start px-4 py-2'
                                  onClick={() => {
                                    onClose();
                                    onChangeToken(t);
                                  }}
                                >
                                  <TokenImageSRC
                                    size={20}
                                    src={t?.assets?.svgUrl}
                                    alt={t?.ticker}
                                    identifier={t.identifier}
                                    className='w-[20px] h-[20px] rounded-full'
                                  />

                                  <p>{formatTokenI(t?.ticker)}</p>
                                </div>
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      )}
                    </CommandList>
                  </Command>
                </DialogContent>
              </Dialog>
              <div className='w-full relative'>
                <Input
                  type='text'
                  className='border-none text-end px-0 text-[20px] lg:text-[22px] focus-visible:border-none focus-visible:ring-0 focus-visible:ring-offset-0'
                  placeholder='0.0'
                  onChange={(e) => onChange(e.target.value, elrondToken)}
                  value={
                    readOnly ? (formatNumber(value || '0') as string) : value
                  }
                  readOnly={readOnly}
                />
                {dollarValue != null ? (
                  <div className='absolute bottom-[-15px] right-0  text-muted-foreground '>
                    $ {dollarValue}
                  </div>
                ) : null}
              </div>
            </div>
            <div className='flex items-center gap-1 mt-3 text-xs lg:text-md'>
              [balance] <span className=''>{formatBalance(accountToken)}</span>
            </div>
          </div>

          <div></div>
        </div>
      </div>
    </>
  );
};

export default InputBox;
