import { useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Switch } from '../ui/switch';
import { IssueTokenSchema } from './IssueTokenForm';

const IssueTokenSwitch = ({
  name,
  label
}: {
  name:
    | 'properties.canFreeze'
    | 'properties.canWipe'
    | 'properties.canPause'
    | 'properties.canChangeOwner'
    | 'properties.canUpgrade'
    | 'properties.canAddSpecialRoles';
  label: string;
}) => {
  const form = useFormContext<z.infer<typeof IssueTokenSchema>>();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex flex-row items-center justify-between '>
          <div className='space-y-0.5'>
            <FormLabel>{label}</FormLabel>
          </div>
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default IssueTokenSwitch;
