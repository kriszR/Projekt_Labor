import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ExpirationFilter = ({ value, onChange }) => {
  const options = [
    { value: 7, label: '7 days' },
    { value: 14, label: '14 days' },
    { value: 30, label: '30 days' },
    { value: 60, label: '60 days' },
    { value: 90, label: '90 days' },
    { value: 365, label: '1 year' },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-semibold text-white bg-primary/75 px-2 py-1 rounded backdrop-blur-sm">
        Filter products:
      </span>
      <Select value={value.toString()} onValueChange={(val) => onChange(parseInt(val))}>
        <SelectTrigger className="w-[140px] bg-black/20 text-white backdrop-blur-sm border-0 hover:bg-black/30">
          <SelectValue placeholder="Válassz időtartamot" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value.toString()}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ExpirationFilter;