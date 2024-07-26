'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl } from '@/components/ui/form';
import { z } from 'zod';

import { degenNewCoin } from '@/actions/coins';
import CustomFormField, {
  FormFieldType
} from '@/components/CustomFormField/CustomFormField';
import { useUploadThing } from '@/hooks/useUploadThing';
import { newToken } from '@/services/sc/degen_master/calls';
import { fetchNewTokenFee } from '@/services/sc/degen_master/queries';
import { formatBalance } from '@/utils/mx-utils';
import { generateRandomString } from '@/utils/strings';
import { errorToast } from '@/utils/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

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

  const { startUpload } = useUploadThing('newDegenCoin');

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    const { name, ticker, description, image, telegram, twitter, website } =
      values;

    if (fee) {
      const degenId = generateRandomString(10);

      const data = {
        name: name,
        description: description,
        telegram: telegram,
        twitter: twitter,
        website: website,
        degenId: degenId
      };
      await degenNewCoin(data);
      newToken(name, ticker.toUpperCase(), fee, degenId);

      startUpload([image], {
        degenId: degenId
      } as any);
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
                  accept='image/png, image/svg'
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
