import { useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Alert,
  Snackbar,
  Avatar,
  IconButton,
} from '@mui/material';
import { PhotoCamera, Delete } from '@mui/icons-material';
import { BookForm, vendors, ageRatings, defaultBookFormValues } from '../../types/BookForm';
import type { BookFormData } from '../../types/BookForm';
import type { BookListing } from '../../types/BookListing';
import { convertImageToBase64, validateImageFile, compressImage } from '../../utils/imageUtils';

export default function BookSubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookFormData>({
    resolver: zodResolver(BookForm),
    defaultValues: defaultBookFormValues,
  });

  const onSubmit = async (data: BookFormData) => {
    if (!selectedImage) {
      setImageError('Please upload a cover image');
      return;
    }

    setIsSubmitting(true);
    try {
      // Convert BookFormData to BookListing
      const bookListing: BookListing = {
        cover: selectedImage,
        title: data.title,
        vendor: data.vendor,
        author: data.author,
        numberOfPages: data.numberOfPages,
        synopsis: data.synopsis,
        price: data.price,
        ageRating: data.ageRating,
      };
      const response = await fetch("http://localhost:3001/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookListing),
      });
      if (!response.ok) {
        throw new Error("Failed to save book");
      }
      const bookdata = await response.json();
      console.log("Book saved:", bookdata);

      setSnackbar({
        open: true,
        message: 'Book submitted successfully!',
        severity: 'success',
      });

      // Reset form
      reset(defaultBookFormValues);
      setSelectedImage(null);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to submit book. Please try again.',
        severity: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    const validationError = validateImageFile(file);
    if (validationError) {
      setImageError(validationError);
      return;
    }

    try {
      setImageError(null);
      // Compress image if needed
      const compressedFile = await compressImage(file);
      // Convert to base64
      const base64String = await convertImageToBase64(compressedFile);
      setSelectedImage(base64String);
    } catch (error) {
      setImageError('Failed to process image. Please try again.');
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImageError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Submit New Book
          </Typography>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              {/* Cover Image Upload */}
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Cover Image *
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                  
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<PhotoCamera />}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Upload Cover Page
                  </Button>
                  
                  {selectedImage && (
                    <IconButton
                      color="error"
                      onClick={handleRemoveImage}
                      title="Remove image"
                    >
                      <Delete />
                    </IconButton>
                  )}
                </Box>
                
                {selectedImage && (
                  <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                      src={selectedImage}
                      variant="rounded"
                      sx={{ width: 100, height: 140 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Image uploaded successfully
                    </Typography>
                  </Box>
                )}
                
                {imageError && (
                  <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                    {imageError}
                  </Typography>
                )}
                
                <Typography variant="caption" color="text.secondary">
                  Supported formats: JPEG, PNG, GIF, WebP. Max size: 5MB
                </Typography>
              </Box>

              {/* Title */}
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Book Title"
                    fullWidth
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                )}
              />

              {/* Author */}
              <Controller
                name="author"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Author"
                    fullWidth
                    error={!!errors.author}
                    helperText={errors.author?.message}
                  />
                )}
              />

              {/* Vendor */}
              <Controller
                name="vendor"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.vendor}>
                    <InputLabel>Vendor</InputLabel>
                    <Select {...field} label="Vendor">
                      {vendors.map((vendor) => (
                        <MenuItem key={vendor} value={vendor}>
                          {vendor}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.vendor && (
                      <FormHelperText>{errors.vendor.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />

              {/* Number of Pages */}
              <Controller
                name="numberOfPages"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Number of Pages"
                    type="number"
                    fullWidth
                    error={!!errors.numberOfPages}
                    helperText={errors.numberOfPages?.message}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />

              {/* Price */}
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Price ($)"
                    type="number"
                    fullWidth
                    error={!!errors.price}
                    helperText={errors.price?.message}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    inputProps={{ step: 0.01, min: 0 }}
                  />
                )}
              />

              {/* Age Rating */}
              <Controller
                name="ageRating"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.ageRating}>
                    <InputLabel>Age Rating</InputLabel>
                    <Select {...field} label="Age Rating">
                      {ageRatings.map((rating) => (
                        <MenuItem key={rating} value={rating}>
                          {rating}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.ageRating && (
                      <FormHelperText>{errors.ageRating.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />

              {/* Synopsis */}
              <Controller
                name="synopsis"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Synopsis"
                    multiline
                    rows={4}
                    fullWidth
                    error={!!errors.synopsis}
                    helperText={errors.synopsis?.message || "Minimum 100 characters required"}
                  />
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubmitting}
                sx={{ mt: 2 }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Book'}
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>

      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
