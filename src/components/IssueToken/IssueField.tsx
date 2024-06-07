import { useFormContext } from 'react-hook-form';
import { z } from 'zod';

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { IssueTokenSchema } from './IssueTokenForm';

const IssueField = ({
  name,
  label
}: {
  name: 'name' | 'ticker' | 'mintAmount' | 'decimals';
  label: string;
}) => {
  const form = useFormContext<z.infer<typeof IssueTokenSchema>>();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              {...field}
              className='bg-[#1C243E] border-none'
              placeholder={label}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default IssueField;
