import { replyMessage, sendPoolMessage } from '@/actions/messages';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import useDisclosure from '@/hooks/useDisclosure';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowUpIcon } from 'lucide-react';
import { PropsWithChildren, ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
import { z } from 'zod';

const SendMessageSchema = z.object({
  message: z.string()
});

const SendMessagePopup = ({
  pool,
  children,
  repliedMessage
}: PropsWithChildren<{ pool: string; repliedMessage?: number | null }>) => {
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

    try {
      if (repliedMessage) {
        await replyMessage(values.message, pool, repliedMessage);
      } else {
        await sendPoolMessage(values.message, pool);
      }
      toast({
        description: (
          <div>
            <FontAwesomeIcon
              icon={faCheckCircle}
              className='mr-2 text-green-500'
            />
            Message sent!
          </div>
        )
      });
      mutate(['/chats/', pool]);
    } catch (error) {
      console.log(error.message);

      toast({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        title: (
          <div>
            <FontAwesomeIcon
              icon={faCheckCircle}
              className='mr-2 text-red-500'
            />
            Error sending message!
          </div>
        ) as ReactNode,
        description: <div className='ml-5'>{error.message}</div>
      });
    }

    onClose();
  }
  return (
    <Dialog open={isOpen} onOpenChange={onToggle}>
      {children}
      <DialogContent className='p-4 sm:max-w-md'>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
          <div className='flex flex-col gap-4'>
            <div className='space-y-2'>
              <DialogTitle>Send a Message</DialogTitle>
              <DialogDescription>
                Type your message in the input below and click send.
              </DialogDescription>
            </div>
            {repliedMessage && (
              <div className='flex items-center gap-2'>
                <div className='text-sm text-primary'>
                  Replying to message #{repliedMessage}
                </div>
              </div>
            )}
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
