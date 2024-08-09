'use client';
import { createSiteModeCookie } from '@/actions/cookies';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { siteModes } from '@/localConstants/globals';
import { usePathname, useRouter } from 'next/navigation';
export default function SiteMode() {
  const pathname = usePathname();
  pathname.split('/');
  const mode = pathname.split('/')[1];
  const router = useRouter();

  const handleModeChange = (mode) => {
    createSiteModeCookie(mode);

    // redirect
    router.push(`/${mode}`);
  };

  return (
    <Select value={mode} onValueChange={handleModeChange}>
      <SelectTrigger className='w-[80px] text-white border border-gray-300 h-[22px] mr-3'>
        <SelectValue placeholder='Site Modes' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Modes</SelectLabel>
          {siteModes.map((mode) => (
            <SelectItem key={mode} value={mode} className='capitalize'>
              {mode}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
