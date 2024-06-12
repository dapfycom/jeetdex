import { addSocialsCoin } from '@/actions/coins';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { useGetCoins } from '@/hooks/useGetCoins';
import { errorToast, successToast } from '@/utils/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { PropsWithChildren, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const formSchema = z.object({
  // optional
  twitter: z.union([z.string().url(), z.string().length(0)]).optional(),
  telegram: z.union([z.string().url(), z.string().length(0)]).optional(),
  website: z.union([z.string().url(), z.string().length(0)]).optional(),
  title: z.string().optional(),
  description: z.string().optional()
});
interface IProps {
  tokenIdentifier: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

const AddSocialsModal = ({
  children,
  tokenIdentifier,
  isOpen,
  onToggle
}: PropsWithChildren<IProps>) => {
  const { coinRes, mutate } = useGetCoins(tokenIdentifier);

  const coinData = useMemo(() => coinRes?.data, [coinRes?.data]);
  const { twitter, telegram, website, title, description } = coinData || {};

  console.log(coinData);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      twitter: '',
      telegram: '',
      website: '',
      title: '',
      description: ''
    }
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    console.log(values);
    try {
      await addSocialsCoin({
        identifier: tokenIdentifier,
        title: values.title,
        description: values.description,
        twitter: values.twitter,
        telegram: values.telegram,
        website: values.website
      });

      mutate();

      successToast('Socials updated successfully');
    } catch (error) {
      console.log(error);

      errorToast('Error updating socials');
    }
  }

  useEffect(() => {
    if (twitter) {
      form.setValue('twitter', twitter || '');
    }

    if (telegram) {
      form.setValue('telegram', telegram || '');
    }
    if (website) {
      form.setValue('website', website || '');
    }
    if (title) {
      form.setValue('title', title || '');
    }

    if (description) {
      form.setValue('description', description || '');
    }
  }, [description, telegram, title, twitter, website, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onToggle}>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='mb-5'>
            Let the world know about your token
          </DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-8'
              >
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder='Title'
                          className='bg-[#2e303a]'
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />{' '}
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder='Description'
                          className='bg-[#2e303a]'
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />{' '}
                <FormField
                  control={form.control}
                  name='twitter'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder='Twitter'
                          className='bg-[#2e303a]'
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />{' '}
                <FormField
                  control={form.control}
                  name='telegram'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder='Telegram'
                          className='bg-[#2e303a]'
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='website'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder='Website'
                          className='bg-[#2e303a]'
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type='submit'>Submit</Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddSocialsModal;
