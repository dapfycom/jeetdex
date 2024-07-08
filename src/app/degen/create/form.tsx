'use client';
import React from 'react';

import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl } from '@/components/ui/form';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomFormField, {
  FormFieldType
} from '@/components/CustomFormField/CustomFormField';
import { fetchNewTokenFee, newToken } from '@/services/sc/degen_master';
import useSWR from 'swr';
import { errorToast } from '@/utils/toast';
import { formatBalance } from '@/utils/mx-utils';

const formSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(50)
    .regex(/^\S*$/, 'name must not contain whitespace'),
  ticker: z
    .string()
    .min(3)
    .max(10)
    .regex(/^\S*$/, 'ticker must not contain whitespace'),
  description: z.string().max(500).nullable(),
  image: z.instanceof(File),
  twitter: z.union([z.string().url(), z.string().length(0)]).optional(),
  telegram: z.union([z.string().url(), z.string().length(0)]).optional(),
  website: z.union([z.string().url(), z.string().length(0)]).optional()
});

const CreateTokenForm = () => {
  const { data: fee } = useSWR('degenMaster:getNewTokenFee', fetchNewTokenFee);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      ticker: '',
      description: '',
      image: null,
      telegram: '',
      twitter: '',
      website: ''
    }
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    if (fee) {
      newToken(values.name, values.ticker, fee);
    } else {
      errorToast('Error fetching the fee');
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-6 w-full max-w-sm'
      >
        <CustomFormField
          control={form.control}
          label='name'
          name='name'
          fieldType={FormFieldType.INPUT}
        />
        <CustomFormField
          control={form.control}
          label='ticker'
          name='ticker'
          fieldType={FormFieldType.INPUT}
        />

        <CustomFormField
          control={form.control}
          label='description'
          name='description'
          fieldType={FormFieldType.TEXTAREA}
        />

        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name='image'
          label='image'
          renderSkeleton={(field) => (
            <FormControl>
              <div className='border border-gray-200 py-2 px-3 rounded-md'>
                <input
                  type='file'
                  onChange={(e) => field.onChange(e.target.files[0])}
                />
              </div>
              {/* <FileUploader files={field.value} onChange={field.onChange} /> */}
            </FormControl>
          )}
        />
        <CustomFormField
          control={form.control}
          label='telegram'
          name='telegram'
          placeholder='(optional)'
          fieldType={FormFieldType.INPUT}
        />
        <CustomFormField
          control={form.control}
          label='twitter'
          name='twitter'
          placeholder='(optional)'
          fieldType={FormFieldType.INPUT}
        />
        <CustomFormField
          control={form.control}
          label='website'
          name='website'
          placeholder='(optional)'
          fieldType={FormFieldType.INPUT}
        />

        <Button type='submit' className='w-full'>
          Create coin
        </Button>

        <p>
          Cost to deploy:{' '}
          {formatBalance({
            balance: fee,
            decimals: 18
          })}{' '}
          EGLD
        </p>
      </form>
    </Form>
  );
};

export default CreateTokenForm;

// export const CustomFormField = ({
//   control,
//   name,
//   label,
//   placeholder
// }: {
//   control: Control;
//   name: string;
//   label: string;
//   placeholder?: string;
// }) => {
//   return (
//     <FormField
//       control={control}
//       name={name}
//       render={({ field }) => (
//         <FormItem className='w-full space-y-1'>
//           <FormLabel className='text-ring mb-[-0px] inline-block'>
//             {label}
//           </FormLabel>
//           <FormControl>
//             <Input
//               {...field}
//               placeholder={placeholder}
//               className='border border-gray-200'
//             />
//           </FormControl>

//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   );
// };
