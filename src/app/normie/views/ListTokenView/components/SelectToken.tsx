import { TokenImageSRC } from '@/components/TokenImage/TokenImage';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useEffect } from 'react';

interface ISelectTokenProps {
  tokens: any[];
  onChange: (value: string) => void;
}

const SelectToken = ({ tokens, onChange }: ISelectTokenProps) => {
  useEffect(() => {
    onChange && onChange(tokens[0].identifier);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Select defaultValue={tokens[0].identifier} onValueChange={onChange}>
      <SelectTrigger className='w-full h-10 bg-[#1C243E]'>
        <SelectValue className='py-3' placeholder={null} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {tokens.map((token) => (
            <SelectItem key={token.identifier} value={token.identifier}>
              <div className='flex gap-3 items-center'>
                <TokenImageSRC
                  src={token?.assets?.svgUrl}
                  alt='logo'
                  identifier={token.identifier}
                  size={20}
                  className='rounded-full w-5 h-5'
                />

                <h3 className='text-sm'>{token.identifier}</h3>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectToken;
