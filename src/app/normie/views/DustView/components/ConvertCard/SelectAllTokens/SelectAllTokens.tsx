import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { maxAllowedTokensCount } from '../../../lib/contants';
import { selectConvertInfo, selectOutputToken } from '../../../lib/dust-slice';
import { useSelectableDustTokens } from '../../../lib/hooks';

const SelectAllTokens = () => {
  const { finalTokens } = useSelectableDustTokens();
  const dispatch = useAppDispatch();
  const selectedTokens = useAppSelector(selectConvertInfo);

  const handleSelectAll = () => {
    if (
      selectedTokens.length >= maxAllowedTokensCount ||
      finalTokens.length === selectedTokens.length
    ) {
      dispatch(
        selectOutputToken({
          data: finalTokens,
          isCheked: false
        })
      );
    } else {
      const allSelctedTpkens = finalTokens.slice(0, maxAllowedTokensCount);

      dispatch(
        selectOutputToken({
          data: allSelctedTpkens,
          isCheked: true
        })
      );
    }
  };
  return (
    <Button className='text-sm' onClick={handleSelectAll}>
      Select All
    </Button>
  );
};

export default SelectAllTokens;
