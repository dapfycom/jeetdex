'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { updateUserProfile } from '@/actions/user';
import { toast } from '@/components/ui/use-toast';
import useDisclosure from '@/hooks/useDisclosure';
import { faCheckCircle, faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { mutate } from 'swr';
import { z } from 'zod';
import { ProfileCtx } from '../ProfileContext';

const editProfileSchema = z.object({
  username: z.string().min(2).max(50),
  bio: z.string().min(2).max(100)
});
const EditProfile = () => {
  const profileContext = useContext(ProfileCtx);
  const { isOpen, onToggle, onClose } = useDisclosure();
  const form = useForm({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      username: '',
      bio: ''
    }
  });

  useEffect(() => {
    if (profileContext) {
      form.setValue('username', profileContext.username);
      form.setValue('bio', profileContext.bio);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileContext]);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof editProfileSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    try {
      await updateUserProfile({
        username: values.username,
        bio: values.bio
      });
      onClose();
      toast({
        description: (
          <div>
            <FontAwesomeIcon
              icon={faCheckCircle}
              className='mr-2 text-green-500'
            />
            User profile updated!
          </div>
        )
      });

      mutate('/user/private');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog onOpenChange={onToggle} open={isOpen}>
      <DialogTrigger asChild>
        <Button className='text-xs mb-1 items-center ' variant='outline'>
          Edit profile
          <FontAwesomeIcon icon={faPencil} className='ml-2 w-4 h-4' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div>
          <DialogHeader>
            <DialogTitle>Edit your profile</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='mt-8 flex flex-col gap-4 mb-4 '
            >
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder='shadcn' {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='bio'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Input placeholder='Say something funny' {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type='submit'>Save changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
