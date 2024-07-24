'use client';
import TokenSocials from '@/app/normie/views/SwapView/commons/SwapCard/commons/Socials/TokenSocials';
import { useGetBoundingPair } from '../../hooks';

const DegenTokenSocials = () => {
  const { coin } = useGetBoundingPair();
  if (!coin) return null;
  return (
    <div>
      <TokenSocials tokenIdentifier={coin?.identifier} />
    </div>
  );
};

export default DegenTokenSocials;
