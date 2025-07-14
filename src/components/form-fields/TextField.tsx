import { Controller } from 'react-hook-form';
import type { Control, FieldError } from 'react-hook-form';
import { TextField as MuiTextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material';

interface CustomTextFieldProps extends Omit<TextFieldProps, 'error' | 'helperText'> {
  name: string;
  control: Control<any>;
  error?: FieldError;
  helperText?: string;
}

export function CustomTextField({ 
  name, 
  control, 
  error, 
  helperText,
  ...textFieldProps 
}: CustomTextFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <MuiTextField
          {...field}
          {...textFieldProps}
          fullWidth
          error={!!error}
          helperText={error?.message || helperText}
        />
      )}
    />
  );
} 