import { useRouter, useSearchParams } from 'next/navigation';

const useUpdateUrlParams = (params?: string[]) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  // const pathname = usePathname();

  const updateParams = (param: string, value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
    current.set(param, value);
    const query = current.toString();

    router.push(`?${query}`);
  };

  return {
    updateParams,
    currentParams: params ? params.map((p) => searchParams.get(p)) : null
  };
};

export default useUpdateUrlParams;
