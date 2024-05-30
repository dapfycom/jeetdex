import { sendPoolMessage } from '@/actions/messages';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import useDisclosure from '@/hooks/useDisclosure';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowUpIcon, PlusIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { mutate } from 'swr';
import { z } from 'zod';

const SendMessageSchema = z.object({
  message: z.string()
});

const SendMessagePopup = ({ pool }: { pool: string }) => {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const form = useForm({
    resolver: zodResolver(SendMessageSchema),

    defaultValues: {
      message: ''
    }
  });

  async function onSubmit(values: z.infer<typeof SendMessageSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    await sendPoolMessage(values.message, pool);

    mutate(['/chats/', pool]);

    toast('Message sent!');

    onClose();
  }
  return (
    <Dialog open={isOpen} onOpenChange={onToggle}>
      <DialogTrigger asChild>
        <Button
          className='absolute top-3 right-3 w-8 h-8'
          size='icon'
          type='button'
        >
          <PlusIcon className='w-4 h-4' />
          <span className='sr-only'>Open Message Input</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='p-4 sm:max-w-md'>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
          <div className='flex flex-col gap-4'>
            <div className='space-y-2'>
              <DialogTitle>Send a Message</DialogTitle>
              <DialogDescription>
                Type your message in the input below and click send.
              </DialogDescription>
            </div>
            <div className='relative'>
              <Textarea
                className='min-h-[96px] rounded-2xl resize-none p-4 border border-gray-200 shadow-sm pr-16 dark:border-gray-800'
                id='message'
                placeholder='Type your message...'
                rows={3}
                {...form.register('message')}
              />
              <Button
                className='absolute top-3 right-3 w-8 h-8'
                size='icon'
                type='submit'
              >
                <ArrowUpIcon className='w-4 h-4' />
                <span className='sr-only'>Send</span>
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SendMessagePopup;
