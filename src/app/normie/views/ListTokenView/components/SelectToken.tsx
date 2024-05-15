import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
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
      <SelectTrigger className='w-full h-12 bg-zinc-800'>
        <SelectValue className='py-3' placeholder={null} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {tokens.map((token) => (
            <SelectItem key={token.identifier} value={token.identifier}>
              <div className='flex gap-3 items-center'>
                {token?.assets?.svgUrl ? (
                  <Image
                    src={token.assets.svgUrl}
                    alt='logo'
                    width={24}
                    height={24}
                    className='rounded-full'
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faQuestionCircle}
                    className='w-6 h-6'
                  />
                )}

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
