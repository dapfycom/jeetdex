import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { tokensID } from '@/config';
import { interactions } from '@/services/sc/interactions';
import { BytesValue } from '@multiversx/sdk-core/out';
import { useState } from 'react';
const SellDust = () => {
  const [token, setToken] = useState('');

  const handleAddAllowedTokens = () => {
    console.log({ token });

    interactions.dust.scCall({
      functionName: 'sellDust',
      arg: [BytesValue.fromUTF8(token)],
      gasL: 600_000_000
    });
  };
  return (
    <div className='flex flex-col gap-3 w-full max-w-[300px] border rounded-2xl px-5 py-10'>
      <Label className='text-muted-foreground'>To swap token to: </Label>
      <div className='flex gap-2 flex-wrap'>
        <Button variant={'secondary'} onClick={() => setToken(tokensID.bsk)}>
          BSK
        </Button>
        <Button variant={'secondary'} onClick={() => setToken(tokensID.wegld)}>
          WEGLD
        </Button>
        <Button
          variant={'secondary'}
          onClick={() => setToken(tokensID.padawan)}
        >
          PADAWAN
        </Button>
      </div>

      <Input
        placeholder='BSK-baa025'
        onChange={(e) => setToken(e.target.value)}
        value={token}
      />
      <Button onClick={handleAddAllowedTokens} className='w-full max-w-[300px]'>
        Swap to
      </Button>
    </div>
  );
};

export default SellDust;
