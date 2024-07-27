'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl } from '@/components/ui/form';
import { z } from 'zod';

import { degenNewCoin } from '@/actions/coins';
import Collapse from '@/components/Collapse/Collapse';
import CustomFormField, {
  FormFieldType
} from '@/components/CustomFormField/CustomFormField';
import useDisclosure from '@/hooks/useDisclosure';
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
    .regex(
      /^[a-zA-Z0-9]*$/,
      'name must be alphanumeric and must not contain whitespace or special characters'
    ),
  ticker: z
    .string()
    .min(3)
    .max(10)
    .regex(
      /^[a-zA-Z0-9]*$/,
      'ticker must be alphanumeric and must not contain whitespace or special characters'
    ),
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
    mode: 'all',
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { startUpload } = useUploadThing('newDegenCoin');

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
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

      try {
        await degenNewCoin(data);
        startUpload([image], {
          degenId: degenId
        } as any);
        console.log('say something');

        // console.log(res);

        // if (!res) {
        //   errorToast('Error uploading the image');
        //   return;
        // }

        return newToken(name, ticker.toUpperCase(), fee, degenId);
      } catch (error) {
        errorToast('Error creating the coin');
      }
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
        <div
          className='text-sm text-gray-200 cursor-pointer'
          onClick={isOpen ? onClose : onOpen}
        >
          {isOpen ? 'Show less' : 'Show more options'}
        </div>
        <Collapse isOpen={isOpen}>
          <div className='space-y-6 w-full max-w-sm'>
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
          </div>
        </Collapse>
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
