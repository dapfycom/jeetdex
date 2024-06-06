import { replyMessage, sendPoolMessage } from '@/actions/messages';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import useDisclosure from '@/hooks/useDisclosure';
import { useUploadThing } from '@/hooks/useUploadThing';
import { errorToast, successToast } from '@/utils/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDropzone } from '@uploadthing/react';
import { ArrowUpIcon, Loader2 } from 'lucide-react';
import { PropsWithChildren, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
import { generateClientDropzoneAccept } from 'uploadthing/client';
import { z } from 'zod';

const SendMessageSchema = z.object({
  message: z.string()
});

const SendMessagePopup = ({
  pool,
  children,
  repliedMessage
}: PropsWithChildren<{ pool: string; repliedMessage?: number | null }>) => {
  const [loading, setLoading] = useState(false);

  // file upload

  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { startUpload, routeConfig } = useUploadThing('messageImage', {
    onClientUploadComplete: () => {
      successToast('Message sent!');
      mutate(['/chats/', pool]);
      setLoading(false);
      onClose();
    },
    onUploadError: (e) => {
      errorToast(e.message);
      setLoading(false);
    }
  });
  const fileTypes = routeConfig ? Object.keys(routeConfig) : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined
  });

  // others

  const { isOpen, onClose, onToggle } = useDisclosure();
  const form = useForm({
    resolver: zodResolver(SendMessageSchema),

    defaultValues: {
      message: ''
    }
  });

  async function onSubmit(values: z.infer<typeof SendMessageSchema>) {
    setLoading(true);
    if (files.length > 0) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      startUpload(files, {
        pool: pool,
        message: values.message,
        repliedMessage: repliedMessage
      });
    } else {
      try {
        if (repliedMessage) {
          await replyMessage(values.message, pool, repliedMessage);
        } else {
          await sendPoolMessage(values.message, pool);
        }
        successToast('Message sent!');
        mutate(['/chats/', pool]);

        onClose();
      } catch (error) {
        console.log(error.message);
        errorToast(' Error sending message!');
      }
      setLoading(false);
    }
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
                className='min-h-[96px] rounded-sm resize-none p-4 border border-gray-200 shadow-sm pr-16 dark:border-gray-800'
                id='message'
                placeholder='Type your message...'
                rows={3}
                {...form.register('message')}
              />

              <div
                {...getRootProps()}
                className=' w-full bg-primary rounded-sm px-4 py-4 mt-4 flex items-center gap-2 text-primary-foreground cursor-pointer'
              >
                <input {...getInputProps()} />
                <div>
                  {files.length > 0 ? (
                    <div>{files[0].name}</div>
                  ) : (
                    <div>
                      Drag and drop files here, or click to select files
                    </div>
                  )}
                </div>
              </div>

              <Button
                className='absolute top-3 right-3 w-8 h-8'
                size='icon'
                type='submit'
              >
                {loading ? (
                  <Loader2 className='w-4 h-4 animate-spin' />
                ) : (
                  <ArrowUpIcon className='w-4 h-4' />
                )}
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
