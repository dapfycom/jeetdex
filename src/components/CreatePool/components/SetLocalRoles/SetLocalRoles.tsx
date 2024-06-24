import { Button } from '@/components/ui/button';
import useTxNotification from '@/hooks/useTxNotification';
import { cn } from '@/lib/utils';
import { SendTransactionReturnType } from '@multiversx/sdk-dapp/types';
import { ForwardedRef, forwardRef, useState } from 'react';
import { setRoles } from '../../utils/sc.calls';
import {
  useGetLpIdentifier,
  useGetPoolPair,
  usePoolHaveLocalRoles
} from '../../utils/swr.hooks';
export interface IAccountRoles {
  type: string;
  identifier: string;
  name: string;
  ticker: string;
  owner: string;
  decimals: number;
  isPaused: boolean;
  transactions: number;
  transactionsLastUpdatedAt: number;
  transfers: number;
  transfersLastUpdatedAt: number;
  accounts: number;
  accountsLastUpdatedAt: number;
  canUpgrade: boolean;
  canMint: boolean;
  canChangeOwner: boolean;
  canAddSpecialRoles: boolean;
  canPause: boolean;
  canFreeze: boolean;
  canWipe: boolean;
  mexPairType: string;
  role: Role;
  canLocalMint: boolean;
  canLocalBurn: boolean;
  canTransfer: boolean;
}

export interface Role {
  canLocalMint: boolean;
  canLocalBurn: boolean;
  roles: string[];
}
const SetLocalRoles = forwardRef(
  (props: { onNextStep: () => void }, ref: ForwardedRef<HTMLDivElement>) => {
    const { pair, exists } = useGetPoolPair();
    const { haveLocales, mutate } = usePoolHaveLocalRoles(pair);

    const { lpIdentifier } = useGetLpIdentifier(pair);
    console.log(lpIdentifier);

    const onSuccess = () => {
      props.onNextStep();
      mutate();
    };
    const [sessionId, setSessionId] = useState<string | null>(null);

    useTxNotification({ onSuccess, waitTx: true, sessionId, setSessionId });

    const handleSetRoles = async () => {
      const res: SendTransactionReturnType = await setRoles(pair);

      if (res) {
        setSessionId(res.sessionId);
      }
    };

    return (
      <div className={cn('bg-card rounded-sm p-4 w-full text-left')} ref={ref}>
        <h2 className='text-gray-300'>4. Set locale roles</h2>

        <div className={cn(lpIdentifier === '' && 'hidden')}>
          {haveLocales ? (
            <Button
              className='w-full mt-2'
              variant='destructive'
              onClick={(e) => {
                e.preventDefault();
                props.onNextStep();
              }}
            >
              Pool already exists - Next Step
            </Button>
          ) : (
            <Button
              className='w-full mt-3 p-3 rounded-md'
              onClick={handleSetRoles}
              disabled={!exists}
            >
              Set Roles
            </Button>
          )}
        </div>
      </div>
    );
  }
);
SetLocalRoles.displayName = 'SetLocalRoles';
export default SetLocalRoles;
