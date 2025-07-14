import { useCallback } from 'react';
import { Box, Typography, Avatar, Button, FormHelperText } from '@mui/material';
import { CloudUpload, Delete } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';

interface CustomImageFieldProps {
  label?: string;
  value: string | null;
  onChange: (base64: string) => void;
  onRemove: () => void;
  error?: string | null;
  onError?: (msg: string | null) => void;
  helperText?: string;
  compressImage: (file: File) => Promise<File>;
  convertImageToBase64: (file: File) => Promise<string>;
  validateImageFile: (file: File) => string | null;
}

export function CustomImageField({
  label = 'Image',
  value,
  onChange,
  onRemove,
  error,
  onError,
  helperText,
  compressImage,
  convertImageToBase64,
  validateImageFile,
}: CustomImageFieldProps) {
  const handleDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    const validationError = validateImageFile(file);
    if (validationError) {
      onError?.('File type is not supported');
      return;
    }
    try {
      onError?.(null);
      const compressedFile = await compressImage(file);
      const base64String = await convertImageToBase64(compressedFile);
      onChange(base64String);
    } catch {
      onError?.('Failed to process image. Please try again.');
    }
  }, [onChange, compressImage, convertImageToBase64, validateImageFile, onError]);

  const handleDropRejected = useCallback(() => {
    onError?.('File type is not supported');
  }, [onError]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    onDropRejected: handleDropRejected,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'] },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  return (
    <div>
      {label && <Typography variant="subtitle1" gutterBottom>{label}</Typography>}
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed',
          borderColor: isDragActive ? 'primary.main' : 'divider',
          borderRadius: 2,
          p: 4,
          textAlign: 'center',
          cursor: 'pointer',
          opacity: 1,
          '&:hover': {
            borderColor: value ? 'divider' : 'primary.main',
          },
        }}
      >
        <input {...getInputProps()} />
        {value ? (
          <div className="flex items-center gap-4 justify-center">
            <Avatar src={value} variant="rounded" sx={{ width: 120, height: 180 }} />
            <div>
              <Typography variant="body2" color="text.secondary">Image uploaded successfully</Typography>
              <Button
                size="large"
                color="error"
                variant="contained"
                fullWidth
                onClick={e => {
                  e.stopPropagation();
                  onRemove();
                }}
                startIcon={<Delete />}
                sx={{ mt: 2, fontWeight: 'bold', fontSize: 18 }}
              >
                Remove
              </Button>
            </div>
          </div>
        ) : (
          <>
            <CloudUpload sx={{ fontSize: 60, color: isDragActive ? 'primary.main' : 'action.active' }} />
            <Typography variant="h6" color={isDragActive ? 'primary.main' : 'text.primary'}>
              {isDragActive ? 'Drop the files here' : 'Drag & drop cover image here, or click to select'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Supported formats: JPEG, PNG, GIF, WebP. Max size: 5MB
            </Typography>
          </>
        )}
      </Box>
      {error && (
        <FormHelperText error>{error}</FormHelperText>
      )}
      {!error && helperText && (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </div>
  );
} 