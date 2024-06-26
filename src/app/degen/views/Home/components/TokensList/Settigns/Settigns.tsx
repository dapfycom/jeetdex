import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
const Settings = () => {
  return (
    <div className='flex gap-6 mt-10 flex-col sm:flex-row'>
      <Select defaultValue='bump'>
        <SelectTrigger className='w-[180px] bg-primary hover:opacity-90 text-primary-foreground'>
          <SelectValue placeholder='sort: bump order' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='bump'>sort: bump order</SelectItem>
            <SelectItem value='last-reply'>sort: last reply </SelectItem>
            <SelectItem value='last-count'>sort: reply count</SelectItem>
            <SelectItem value='market'>sort: market cap</SelectItem>
            <SelectItem value='creation'>sort: creation time</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select defaultValue='desc'>
        <SelectTrigger className='w-[180px] bg-primary hover:opacity-90 text-primary-foreground'>
          <SelectValue placeholder='order' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='asc'>order: asc </SelectItem>
            <SelectItem value='desc'>order: desc</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Settings;
