'use client';

import { Form } from '@/components/ui/form';
import { z } from 'zod';

import { degenNewCoin, updateCoinIdentifier } from '@/actions/coins';
import Collapse from '@/components/Collapse/Collapse';
import CustomFormField, {
  FormFieldType
} from '@/components/CustomFormField/CustomFormField';
import RequiredLoginButton from '@/components/RequiredLoginButton/RequiredLoginButton';
import { tokensID } from '@/config';
import useDisclosure from '@/hooks/useDisclosure';
import { fetchTransactionByHash } from '@/services/rest/elrond/transactions';
import { swap } from '@/services/sc/bonding/call';
import { fetchAmountOut } from '@/services/sc/bonding/queries';
import { newToken } from '@/services/sc/degen_master/calls';
import { fetchNewTokenFee } from '@/services/sc/degen_master/queries';
import {
  calculateSlippageAmount,
  formatBalance,
  setElrondBalance
} from '@/utils/mx-utils';
import { generateRandomString } from '@/utils/strings';
import { errorToast } from '@/utils/toast';
import { UploadButton } from '@/utils/uploadthing';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTrackTransactionStatus } from '@multiversx/sdk-dapp/hooks';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

const BuyDialog = dynamic(() => import('./BuyDialog'), {
  ssr: false
});
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
  image: z.object({
    url: z.string().url(),
    name: z.string(),
    owner: z.string()
  }),
  twitter: z.union([z.string(), z.string().length(0)]).optional(),
  telegram: z.union([z.string(), z.string().length(0)]).optional(),
  website: z.union([z.string(), z.string().length(0)]).optional()
});

const CreateTokenForm = () => {
  const [amountToBuyFirstTime, setAmountToBuyFirstTime] = useState('');
  const firstBuyDialogState = useDisclosure();
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
  const [txResultAddress, setTxResultAddress] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isUploading, setIsUploading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const router = useRouter();

  const txHandle = useRef(0);

  const coinFromDb = useRef<{
    id: string;
    identifier: string;
    img: string | null;
    ownerId: string;
    twitter: string | null;
    telegram: string | null;
    website: string | null;
    title: string | null;
    description: string | null;
    degenId: string | null;
  }>();

  const onSuccessTx = async () => {
    if (txHandle.current === 0) {
      const tx = await fetchTransactionByHash(transactions[0].hash);
      form.reset();

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const operation = tx.operations.find(
        (op) => Boolean(op.identifier) && Boolean(op.ticker)
      );

      const result = tx.results.find(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (res) => res.function === 'setTokenIdentifier'
      );

      const identifier = operation?.identifier;

      const address = result.receiver;
      setTxResultAddress(address);

      if (amountToBuyFirstTime === '' || amountToBuyFirstTime === '0') {
        txHandle.current = 0;
        if (coinFromDb.current) {
          updateCoinIdentifier(identifier, coinFromDb.current.id);
        }
        router.push(`/pair/${address}`);
      } else {
        const amountIn = amountToBuyFirstTime;
        const amountScOut = await fetchAmountOut({
          address,
          amountIn: setElrondBalance(amountToBuyFirstTime, 18),
          tokenIn: tokensID.wegld
        });

        const amountOut = calculateSlippageAmount(5, amountScOut).toFixed(0);

        const swapRes = await swap({
          contract: address,
          amountIn: amountIn,
          amountOut: amountOut,
          tokenIn: 'EGLD',
          tokenOut: identifier,
          initialSwap: true
        });
        txHandle.current = 1;
        setAmountToBuyFirstTime('');
        setSessionId(swapRes.sessionId);
      }
    } else {
      txHandle.current = 0;
      router.push(`/pair/${txResultAddress}`);
    }
  };

  // useTxNotification({ sessionId, setSessionId, waitTx: true });
  const { transactions } = useTrackTransactionStatus({
    transactionId: sessionId,
    onSuccess: onSuccessTx
  });

  // 2. Define a submit handler.
  async function onSubmit() {
    firstBuyDialogState.onOpen();
  }

  const handleCreateCoin = async (amountToBuy: string) => {
    const { name, ticker, description, image, telegram, twitter, website } =
      form.getValues();

    if (fee) {
      const degenId = generateRandomString(10);

      const data = {
        name: name,
        description: description,
        image: image.url,
        telegram: telegram,
        twitter: twitter,
        website: website,
        degenId: degenId
      };

      try {
        const resDb = await degenNewCoin(data);
        if (!resDb) {
          errorToast('Error creating the coin');
          return;
        }

        coinFromDb.current = resDb;
        const res = await newToken(
          name,
          ticker.toUpperCase(),
          fee,
          degenId,
          amountToBuy
        );
        setSessionId(res.sessionId);
        setAmountToBuyFirstTime(amountToBuy);
      } catch (error) {
        errorToast('Error creating the coin');
      }
    } else {
      errorToast('Error fetching the fee');
    }
  };

  return (
    <>
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

          <div
            className='text-sm text-gray-200 cursor-pointer'
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
