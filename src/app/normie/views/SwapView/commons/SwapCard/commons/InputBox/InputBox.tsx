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
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import useDisclosure from '@/hooks/useDisclosure';
import useGetAccountToken from '@/hooks/useGetAccountToken';
import useGetElrondToken from '@/hooks/useGetElrondToken';
import useGetMultipleElrondTokens from '@/hooks/useGetMultipleElrondTokens';
import { IElrondAccountToken, IElrondToken } from '@/types/scTypes';
import { formatBalance, formatNumber, formatTokenI } from '@/utils/mx-utils';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChevronDownIcon, Loader, Loader2Icon } from 'lucide-react';
// const SelectTokenModal = lazy(() => import("../SelectTokenModal"));

interface IProps {
  selectedTokenI: string;
  value: string;
  tokensIdentifiers: string[];
  onChange: (val: string, token?: IElrondToken) => void;
  onChangeToken: (t: IElrondToken) => void;
  isLoadingInput?: boolean;

  onMax?: (t: IElrondAccountToken) => void;
  clear?: () => void;
}

const InputBox = ({
  selectedTokenI,
  value,
  tokensIdentifiers,
  onChange,
  onChangeToken,
  onMax,
  clear
}: IProps) => {
  const { elrondToken, isLoading } = useGetElrondToken(selectedTokenI);
  const { accountToken } = useGetAccountToken(selectedTokenI);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { tokens, isLoading: loadingTokens } =
    useGetMultipleElrondTokens(tokensIdentifiers);

  const readOnly = !Boolean(onMax);

  return (
    <>
      <div className='flex flex-col w-full pt-3   rounded-2xl bg-[#0b102280] max-w-[500px] border-[#A259FF] focus-within:border focus-within:shadow-[0px_0px_12px_6px_#A259FF33]'>
        <div className='flex flex-col'>
          <div className='flex justify-between items-start px-8 pb-3 gap-2'>
            <h5 className='text-sm'>From</h5>

            <div className='flex items-center gap-2'>
              <div className='flex items-center gap-1'>
                <FontAwesomeIcon icon={faWallet} />

                <span className='h-[20px]'>{formatBalance(accountToken)}</span>
              </div>

              <div className='flex gap-2'>
                <Button
                  className='px-[6px] h-[20px] text-gray-700 text-[12px]'
                  onClick={() =>
                    onMax && onMax(accountToken as IElrondAccountToken)
                  }
                >
                  Max
                </Button>
                <Button
                  className='px-[6px] h-[20px] text-gray-700 text-[12px]'
                  onChange={clear}
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>
          <div className=' flex justify-between w-full bg-[#0b1022] rounded-2xl py-3 px-5'>
            <Popover
              open={isOpen}
              onOpenChange={(open) => (open ? onOpen() : onClose())}
            >
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className={`ml-auto gap-2 w-fit !h-[56px] rounded-2xl bg-[#1C243E] `}
                >
                  {isLoading ? (
                    <div className='flex px-2'>
                      <Loader2Icon className='animate-spin w-4 h-4' />
                    </div>
                  ) : (
                    <div className={`flex items-center gap-2`}>
                      <div className='w-[23px]'>
                        <TokenImageSRC
                          src={elrondToken?.assets?.svgUrl}
                          alt={elrondToken?.ticker}
                          size={23}
                        />
                      </div>
                      <p className='text-[24px]'>
                        {formatTokenI(elrondToken?.ticker)}
                      </p>
                    </div>
                  )}

                  <ChevronDownIcon className='ml-2 h-4 w-4 text-muted-foreground' />
                </Button>
              </PopoverTrigger>

              <PopoverContent className='p-0' align='end'>
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
              </PopoverContent>
            </Popover>
            <Input
              type='text'
              className='border-none text-end text-[28px] focus-visible:border-none focus-visible:ring-0 focus-visible:ring-offset-0'
              placeholder='0.0'
              onChange={(e) => onChange(e.target.value, elrondToken)}
              value={readOnly ? (formatNumber(value || '0') as string) : value}
              readOnly={readOnly}
            />
          </div>
        </div>
        {/* 
        {accountToken && (
          <div className='flex justify-end mt-3 text-muted-foreground'>
            <div className='flex flex-col gap-1 sm:gap-3 items-center'>
              {!readOnly && (
                <div className='flex gap-1 '>
                  {value !== '' && value !== '0' && value !== null && (
                    <Button
                      size={'sm'}
                      className='text-xs text-red-500'
                      variant={'outline'}
                      onClick={clear}
                    >
                      ABORT
                    </Button>
                  )}
                  <Button
                    size={'sm'}
                    className='text-xs'
                    variant={'outline'}
                    onClick={() =>
                      onMax && onMax(accountToken as IElrondAccountToken)
                    }
                  >
                    MAX
                  </Button>
                </div>
              )}
              <p className='text-sm'>Balance: {formatBalance(accountToken)}</p>
            </div>
          </div>
        )} */}
      </div>
    </>
  );
};

export default InputBox;
