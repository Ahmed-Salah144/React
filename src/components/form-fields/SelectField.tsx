import { Controller } from 'react-hook-form';
import type { Control, FieldError } from 'react-hook-form';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import type { SelectProps } from '@mui/material';

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectFieldProps extends Omit<SelectProps, 'error'> {
  name: string;
  control: Control<any>;
  label: string;
  options: SelectOption[];
  error?: FieldError;
}

export function CustomSelectField({ 
  name, 
  control, 
  label, 
  options, 
  error,
  ...selectProps 
}: CustomSelectFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl fullWidth error={!!error}>
          <InputLabel>{label}</InputLabel>
          <Select {...field} label={label} {...selectProps}>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {error && (
            <FormHelperText>{error.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
} 