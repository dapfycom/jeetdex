'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from '../CreatePoolForm';

export default function DagePicker({
  field,
  label
}: {
  field: 'buyFee' | 'sellFee';
  label: string;
}) {
  const [date, setDate] = React.useState<Date>();
  const from = useFormContext<z.infer<typeof formSchema>>();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date ? format(date, 'PPP') : <span>{label}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          mode='single'
          selected={date}
          onSelect={(data) => {
            setDate(data);
            from.setValue(`${field}.timestamp`, data.getTime());
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
