import Divider from '@/components/Divider/Divider';
import { LpTokenImageV2 } from '@/components/LpTokenImage/LpTokenImage';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { tokensID } from '@/config';
import useGetElrondToken from '@/hooks/useGetElrondToken';
import { formatBalance } from '@/utils/mx-utils';
import {
  useGetFarmUserInfo,
  useLpStoped,
  useNFTsStoped
} from '@/views/FarmView/utils/hooks';
import { stop } from '@/views/FarmView/utils/services';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const WithdrawModal = ({ isOpen, onClose }: IProps) => {
  const { data: userFarmInfo } = useGetFarmUserInfo();

  const { elrondToken: stakedToken, isLoading } = useGetElrondToken(
    tokensID.bskwegld
  );

  const stakeSchema = z.object({
    amount: z.string()
  });

  const form = useForm({
    defaultValues: {
      amount: ''
    },

    resolver: zodResolver(stakeSchema)
  });

  const handleSubmit = (data: z.infer<typeof stakeSchema>) => {
    onClose();
    stop(data.amount, []);
  };

  const handleMax = () => {
    const value = formatBalance(
      { balance: userFarmInfo?.lpActive || 0, decimals: stakedToken.decimals },
      true,
      18
    );
    form.setValue('amount', value as string);
  };

  const { isLpStoped } = useLpStoped();
  const { isNFTsStoped } = useNFTsStoped();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='w-full sm:max-w-[500px]'>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>
                {' '}
                <div className='flex items-center gap-3'>
                  <LpTokenImageV2 lpToken={stakedToken} size={25} />
                  <h3>Withdraw in BSK-EGLD farm</h3>
                </div>
              </DialogTitle>
            </DialogHeader>

            <div className='flex items-center gap-2 px-3 py-2 bg-secondary rounded-md'>
              <AlertCircle className='h-4 w-4' />
              <p className='text-sm flex-1'>
                {' '}
                Please note that your LP tokens or nfts will be available to
                claim in 48 hours after unstaking.
              </p>
            </div>

            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className='flex flex-col gap-2'>
                <Input
                  id='amount-bskegld'
                  name='amount'
                  placeholder='Amount'
                  type='number'
                  {...form.register('amount')}
                />

                <div className='flex justify-between mt-3 text-xs mb-2'>
                  <p className='text-red-700'>
                    {form.formState.errors.amount?.message}
                  </p>
                  <p className='cursor-pointer' onClick={handleMax}>
                    Balance:{' '}
                    {formatBalance({
                      balance: userFarmInfo?.lpActive || 0,
                      decimals: stakedToken.decimals
                    })}
                  </p>
                </div>
              </div>

              <DialogFooter>
                <div className='flex-col flex w-full'>
                  <Button className='w-full' type='submit'>
                    Unstake
                  </Button>
                  <Divider className='my-4' />

                  <div className='flex flex-col'>
                    <p className='text-sm mb-1 text-muted-foreground'>
                      Avilable to usnstake : {userFarmInfo?.nftActive.length}{' '}
                      NFTs
                    </p>
                    <Button
                      className='w-full'
                      onClick={() => {
                        if (userFarmInfo) {
                          onClose();
                          stop(
                            '0',
                            userFarmInfo.nftActive.map((nft) => {
                              const nonce = nft.split('-')[2];
                              return parseInt(nonce, 16);
                            })
                          );
                        }
                      }}
                    >
                      Unstake NFTs
                    </Button>
                  </div>

                  <Divider className='my-4' />

                  <div className='flex flex-col'>
                    <p className='text-sm mb-1 text-muted-foreground'>
                      {isLpStoped ? 'Locked ' : 'Available to claim'}:{' '}
                      {formatBalance({
                        balance: userFarmInfo?.lpStopped || 0,
                        decimals: stakedToken.decimals
                      })}{' '}
                      LP {`and ${userFarmInfo?.nftStopped.length} NFTs`}
                    </p>
                    <Button
                      className='w-full'
                      onClick={() => {
                        onClose();
                      }}
                      disabled={isLpStoped && isNFTsStoped}
                    >
                      Claim
                    </Button>
                  </div>
                </div>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
    // <MyModal isOpen={isOpen} onClose={onClose} size="2xl" py={6}>
    //   {isLoading ? (
    //     <Spinner />
    //   ) : (
    //     <form onSubmit={form.handleSubmit}>
    //       <ModalHeader>
    //         <Flex alignItems={"center"} gap={3}>
    //           <LpTokenImageV2 lpToken={stakedToken} size={35} />
    //           <Heading fontSize={"lg"}>Withdraw in BSK-EGLD farm</Heading>
    //         </Flex>
    //       </ModalHeader>
    //       <ModalBody>
    //         <Alert status="warning" borderRadius={"md"} mb={4} fontSize="14px">
    //           <AlertIcon />
    //           Please note that your LP tokens or nfts will be available to claim
    //           in 48 hours after unstaking.
    //         </Alert>
    //         <InputGroup size={"lg"}>
    //           <Input
    //             name="amount"
    //             type={"number"}
    //             placeholder="Amount"
    //             fontSize={"sm"}
    //             onChange={form.handleChange}
    //             value={form.values.amount}
    //             isInvalid={
    //               form.touched.amount && Boolean(form.errors.amount)
    //             }
    //           />
    //           <InputRightElement
    //             pointerEvents="none"
    //             children={
    //               <Flex pt={2}>
    //                 <LpTokenImageV2 lpToken={stakedToken} size={20} />
    //               </Flex>
    //             }
    //           />
    //         </InputGroup>
    //         <Flex justifyContent="space-between" mt={3} fontSize={"xs"}>
    //           <Text color="tomato">{form.errors.amount}</Text>
    //           <Text onClick={handleMax} cursor="pointer">
    //             Balance:{" "}
    //             {formatBalance({
    //               balance: userFarmInfo?.lpActive,
    //               decimals: stakedToken.decimals,
    //             })}
    //           </Text>
    //         </Flex>
    //         <Flex w="full" gap={4} mt={6} mb={8}>
    //           <ActionButton flex={1} type="submit">
    //             Unstake
    //           </ActionButton>
    //         </Flex>

    //         <Divider />

    //         <Flex mt={4} flexDir="column">
    //           <Text fontSize={"sm"} color="white">
    //             Avilable to usnstake : {userFarmInfo.nftActive.length} NFTs
    //           </Text>
    //           <Flex w="full" gap={4} mt={3} mb={8}>
    //             <ActionButton
    //               flex={1}
    //               onClick={() => {
    //                 stop(
    //                   "0",
    //                   userFarmInfo.nftActive.map((nft) => {
    //                     const nonce = nft.split("-")[2];
    //                     return parseInt(nonce, 16);
    //                   })
    //                 );
    //               }}
    //             >
    //               Unstake NFTs
    //             </ActionButton>
    //           </Flex>
    //         </Flex>
    //         <Divider />

    //         <Flex mt={4} flexDir="column">
    //           <Text fontSize={"sm"} color="white">
    //             {isLpStoped ? "Locked " : "Available to claim"}:{" "}
    //             {formatBalance({
    //               balance: userFarmInfo.lpStopped,
    //               decimals: stakedToken.decimals,
    //             })}{" "}
    //             LP {`and ${userFarmInfo.nftStopped.length} NFTs`}
    //           </Text>
    //           <Flex w="full" gap={4} mt={3} mb={8}>
    //             <ActionButton
    //               flex={1}
    //               onClick={withdraw}
    //               disabled={isLpStoped && isNFTsStoped}
    //             >
    //               Claim
    //             </ActionButton>
    //           </Flex>
    //         </Flex>
    //       </ModalBody>

    //       <ModalFooter>
    //         <Flex w="full" gap={4}>
    //           <ActionButton flex={1} bg="dark.500" onClick={onClose}>
    //             Cancel
    //           </ActionButton>
    //         </Flex>
    //       </ModalFooter>
    //     </form>
    //   )}
    // </MyModal>
  );
};

export default WithdrawModal;
