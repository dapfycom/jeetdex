'use client';

import { Form } from '@/components/ui/form';

import Collapse from '@/components/Collapse/Collapse';
import CustomFormField, {
  FormFieldType
} from '@/components/CustomFormField/CustomFormField';
import RequiredLoginButton from '@/components/RequiredLoginButton/RequiredLoginButton';
import { formatBalance } from '@/utils/mx-utils';
import { errorToast } from '@/utils/toast';
import { UploadButton } from '@/utils/uploadthing';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dynamic from 'next/dynamic';
import useCreateCoinForm from './useCreateCoinForm';

const BuyDialog = dynamic(() => import('./BuyDialog'), {
  ssr: false
});

const CreateTokenForm = () => {
  const {
    form,
    onSubmit,
    isUploading,
    setIsUploading,
    isOpenMoreOptions: isOpen,
    firstBuyDialogState,
    fee,
    handleCreateCoin,
    onCloseMoreOptions: onClose,
    onOpenMoreOptions: onOpen
  } = useCreateCoinForm();
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6 w-full max-w-sm mb-2'
        >
          <div className='space-y-4'>
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
                <UploadButton
                  className='bg-transparent  ut-button:bg-transparent ut-label:w-full'
                  appearance={{
                    button:
                      'bg-transparent border border-gray-200 w-full py-2 px-3 h-fit'
                  }}
                  endpoint='newDegenCoin'
                  onClientUploadComplete={(res) => {
                    // Do something with the response
                    console.log(res);
                    field.onChange({
                      url: res[0].url,
                      name: res[0].name,
                      owner: res[0].serverData.address
                    });

                    setIsUploading(false);
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    errorToast(error.message);
                    setIsUploading(false);
                  }}
                  onUploadBegin={() => {
                    setIsUploading(true);
                  }}
                  content={{
                    button: (
                      <div className=' w-full  rounded-md h-fit flex gap-2'>
                        <div className='bg-gray-200 text-gray-900 px-2 rounded-sm'>
                          Choose file
                        </div>

                        <div>
                          {isUploading
                            ? 'Uploading...'
                            : // only return last 10 charts of image
                            form.watch('image')?.name
                            ? form
                                .watch('image')
                                .name.substring(
                                  form.watch('image').name.length - 10
                                )
                            : 'No file chosen'}
                        </div>
                      </div>
                    ),
                    allowedContent: <div></div>
                  }}
                />
              )}
            />
          </div>

          <div
            className='text-sm text-gray-200 cursor-pointer mb-2'
            onClick={isOpen ? onClose : onOpen}
          >
            {isOpen ? (
              <span>
                Show less{' '}
                <FontAwesomeIcon icon={faChevronUp} className='ml-2' />
              </span>
            ) : (
              <span>
                Show more options{' '}
                <FontAwesomeIcon icon={faChevronDown} className='ml-2' />
              </span>
            )}
          </div>
          <Collapse isOpen={isOpen}>
            <div className='space-y-4 w-full max-w-sm mb-2'>
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
          <RequiredLoginButton
            type='submit'
            className='w-full'
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Create coin'}
          </RequiredLoginButton>

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

      {firstBuyDialogState.isOpen && (
        <BuyDialog
          {...firstBuyDialogState}
          fee={fee}
          tokenName={form.getValues('ticker')}
          onCreateCoin={handleCreateCoin}
        />
      )}
    </>
  );
};

export default CreateTokenForm;
