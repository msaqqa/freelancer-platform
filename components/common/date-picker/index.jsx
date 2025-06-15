'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './style.css';

function DatePickerComponent({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const handleChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleChange}
      dateFormat="MMM dd, yyyy"
      showMonthDropdown
      showYearDropdown
      scrollableYearDropdown
      yearDropdownItemNumber={125}
      // dropdownMode="select"
      calendarClassName="bg-background"
      // className="z-50 rounded-md border border-border bg-popover text-popover-foreground shadow-md shadow-black/5 outline-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 w-auto p-0"
      // wrapperClassName=""
      // popperClassName=""
      // calendarClassName=""
      prevMonthButtonLabel="«"
      nextMonthButtonLabel="»"
      inline
      {...props}
    />
  );
}

export { DatePickerComponent };
