import { useState} from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Stack, Typography } from '@mui/material';
import { CustomSnackbar, useSnackbar } from '../../components/snackbar/CustomSnackbar';
import { CustomTextField, CustomSelectField, CustomNumberField, CustomImageField } from '../../components/form-fields';
import { BookForm, vendors, ageRatings, defaultBookFormValues } from '../../types/BookForm';
import type { BookFormData } from '../../types/BookForm';
import type { BookListing } from '../../types/BookListing';
import { convertImageToBase64, validateImageFile, compressImage } from '../../utils/imageUtils';
import { BookService } from '../../utils/bookService';

export default function BookSubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const { snackbar, showSuccess, showError, hideSnackbar } = useSnackbar();

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
      const bookdata = await BookService.addBook(bookListing);
      console.log('Book saved:', bookdata);
      showSuccess('Book submitted successfully!');
      reset(defaultBookFormValues);
      setSelectedImage(null);
    } catch (error) {
      showError('Failed to submit book. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImageError(null);
  };

  const handleImageChange = (base64: string) => {
    setSelectedImage(base64);
    setImageError(null);
  };

  const handleCloseSnackbar = () => { hideSnackbar(); };

  return (
    <form className="bg-white shadow-md rounded-lg p-6 mx-auto mt-10" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4" gutterBottom>Submit New Book</Typography>
      <Stack spacing={3}>
        <CustomImageField label="Cover Image" value={selectedImage}
         onChange={handleImageChange} onRemove={handleRemoveImage} error={imageError} onError={setImageError}
         compressImage={compressImage} convertImageToBase64={convertImageToBase64} validateImageFile={validateImageFile}
         helperText="Supported formats: JPEG, PNG, GIF, WebP. Max size: 5MB" />
        <CustomTextField name="title" control={control} label="Book Title" error={errors.title} />
        <CustomTextField name="author" control={control} label="Author" error={errors.author} />
        <CustomSelectField name="vendor" control={control} label="Vendor" options={vendors.map(vendor => ({ value: vendor, label: vendor }))} error={errors.vendor} />
        <CustomNumberField name="numberOfPages" control={control} label="Number of Pages" error={errors.numberOfPages} min={1} />
        <CustomNumberField name="price" control={control} label="Price ($)" error={errors.price} step={0.01} min={0} />
        <CustomSelectField name="ageRating" control={control} label="Age Rating" options={ageRatings.map(rating => ({ value: rating, label: rating }))} error={errors.ageRating} />
        <CustomTextField name="synopsis" control={control} label="Synopsis" multiline rows={4} error={errors.synopsis} helperText="Minimum 100 characters required" />
        <Button type="submit" variant="contained" size="large" disabled={isSubmitting} className="mt-4">{isSubmitting ? 'Submitting...' : 'Submit Book'}</Button>
      </Stack>
      <CustomSnackbar snackbar={snackbar} onClose={handleCloseSnackbar} />
    </form>
  );
}
