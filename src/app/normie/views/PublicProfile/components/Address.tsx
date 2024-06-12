'use client';
import { copyTextToClipboard } from '@/utils/general';
import { formatAddress } from '@/utils/mx-utils';
import { successToast } from '@/utils/toast';

const Address = ({ address }: { address: string }) => {
  return (
    <div
      className='bg-[#0b102280] text-sm p-3 rounded mb-4 cursor-pointer'
      onClick={() => {
        copyTextToClipboard(address);
        successToast('Copied address to clipboard');
      }}
    >
      {formatAddress(address)}
    </div>
  );
};

export default Address;
