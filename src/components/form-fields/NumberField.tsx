import { Controller } from 'react-hook-form';
import type { Control, FieldError } from 'react-hook-form';
import { TextField as MuiTextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material';

interface CustomNumberFieldProps extends Omit<TextFieldProps, 'error' | 'helperText' | 'type'> {
  name: string;
  control: Control<any>;
  error?: FieldError;
  helperText?: string;
  min?: number;
  max?: number;
  step?: number;
}

export function CustomNumberField({ 
  name, 
  control, 
  error, 
  helperText,
  min,
  max,
  step = 1,
  ...textFieldProps 
}: CustomNumberFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <MuiTextField
          {...field}
          {...textFieldProps}
          type="number"
          fullWidth
          error={!!error}
          helperText={error?.message || helperText}
          onChange={(e) => field.onChange(Number(e.target.value))}
          inputProps={{ 
            step, 
            min, 
            max,
            ...textFieldProps.inputProps 
          }}
        />
      )}
    />
  );
} 