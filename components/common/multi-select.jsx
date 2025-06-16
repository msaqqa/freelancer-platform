'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Select from 'react-select';

const MultiSelect = ({
  options,
  value,
  onChange,
  getOptionLabel,
  getOptionValue,
  placeholder,
  isLoading,
  className,
  ...props
}) => {
  const { theme } = useTheme();
  const [systemTheme, setSystemTheme] = useState('light');

  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
    }
  }, [theme]);

  return (
    <Select
      isMulti
      options={options}
      value={value}
      onChange={onChange}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      placeholder={placeholder}
      isLoading={isLoading}
      className="bg-background border border-input rounded-md text-sm h-8.5 text-foreground text-[0.8125rem]"
      styles={{
        control: (base) => ({
          ...base,
          height: '100%',
          minHeight: 'auto',
          alignItems: 'start',
          padding: '0',
          border: 'none',
          boxShadow: 'none',
          borderRadius: 'inherit',
          backgroundColor:
            systemTheme === 'dark'
              ? 'oklch(14.1% 0.005 285.823)'
              : 'oklch(1 0 0)',
          color:
            systemTheme === 'dark'
              ? 'oklch(98.5% 0 0)'
              : 'oklch(27.4% 0.006 286.033)',
        }),
        placeholder: (base) => ({
          ...base,
          color:
            systemTheme === 'dark'
              ? 'oklch(55.2% 0.016 285.938)'
              : 'oklch(70.5% 0.015 286.067)',
        }),
        option: (base, state) => ({
          ...base,
          paddingLeft: '20px',
          backgroundColor: state.isFocused
            ? systemTheme === 'dark'
              ? 'oklch(21% 0.006 285.885)'
              : 'oklch(96.7% 0.003 264.542)'
            : systemTheme === 'dark'
              ? 'oklch(14.1% 0.005 285.823)'
              : 'oklch(1 0 0)',
          ':active': {
            backgroundColor:
              state.isFocused && systemTheme === 'dark'
                ? 'oklch(21% 0.006 285.885)'
                : 'oklch(96.7% 0.003 264.542)',
          },
        }),
        multiValue: (base) => ({
          ...base,
          backgroundColor:
            systemTheme === 'dark'
              ? 'oklch(21% 0.006 285.885)'
              : 'oklch(96.7% 0.003 264.542)',
        }),
        multiValueLabel: (base) => ({
          ...base,
          color:
            systemTheme === 'dark'
              ? 'oklch(98.5% 0 0)'
              : 'oklch(27.4% 0.006 286.033)',
        }),
        menu: (base) => ({
          ...base,
          backgroundColor:
            systemTheme === 'dark'
              ? 'oklch(14.1% 0.005 285.823)'
              : 'oklch(1 0 0)',
          boxShadow: 'none',
          borderRadius: 'none',
        }),
        menuList: (base) => ({
          ...base,
          backgroundColor:
            systemTheme === 'dark'
              ? 'oklch(14.1% 0.005 285.823)'
              : 'oklch(1 0 0)',
          color:
            systemTheme === 'dark'
              ? 'oklch(98.5% 0 0)'
              : 'oklch(27.4% 0.006 286.033)',

          padding: '5px',
          border:
            systemTheme === 'dark'
              ? '1px solid oklch(27.4% 0.006 286.033)'
              : '1px solid oklch(92% 0.004 286.32)',
          borderRadius: '6px',
          boxShadow: 'none',
        }),
      }}
      {...props}
    />
  );
};

export default MultiSelect;
