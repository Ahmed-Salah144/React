import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Chip,
  Button,
} from '@mui/material';

import {Clear } from '@mui/icons-material';
import BookCard from '../../sections/product/BookCard';
import { BookService } from '../../utils/bookService';
import type { BookListing } from '../../types/BookListing';
import { vendors, ageRatings } from '../../types/BookForm';

export default function BookListingsPage() {
  const [books, setBooks] = useState<BookListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVendor, setSelectedVendor] = useState<string>('');
  const [selectedAgeRating, setSelectedAgeRating] = useState<string>('');

  // Load books on component mount
  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedBooks = await BookService.getBooks();
      setBooks(fetchedBooks);
    } catch (err) {
      setError('Failed to load books. Please try again later.');
      console.error('Error loading books:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter books based on search and filters
  const filteredBooks = books.filter(book => {
    const matchesSearch = searchQuery === '' || 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.synopsis.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesVendor = selectedVendor === '' || book.vendor === selectedVendor;
    const matchesAgeRating = selectedAgeRating === '' || book.ageRating === selectedAgeRating;
    
    return matchesSearch && matchesVendor && matchesAgeRating;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedVendor('');
    setSelectedAgeRating('');
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <div className="flex justify-center items-center min-h-[50vh]">
          <CircularProgress size={60} />
        </div>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <div className="mt-8">
        {/* Header */}
        <Typography variant="h3" align="center">
          Book Collection
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" className="mb-4">
          Some Amazing Quote About Books
        </Typography>
        {/* Search and Filters */}
        <div className="mb-8">
          <Stack spacing={2}>
            {/* Search Bar */}
            <TextField
              fullWidth
              placeholder="Search books by title, author, or synopsis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Filters */}
            <div className="flex gap-6">
              <FormControl className="min-w-[150px]">
                <InputLabel>Vendor</InputLabel>
                <Select
                  value={selectedVendor}
                  label="Vendor"
                  onChange={(e) => setSelectedVendor(e.target.value)}
                  size="small"
                >
                  <MenuItem value="">All Vendors</MenuItem>
                  {vendors.map((vendor) => (
                    <MenuItem key={vendor} value={vendor}>
                      {vendor}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl className="min-w-[150px]">
                <InputLabel>Age Rating</InputLabel>
                <Select
                  value={selectedAgeRating}
                  label="Age Rating"
                  onChange={(e) => setSelectedAgeRating(e.target.value)}
                  size="small"
                >
                  <MenuItem value="">All Ages</MenuItem>
                  {ageRatings.map((rating) => (
                    <MenuItem key={rating} value={rating}>
                      {rating}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                variant="outlined"
                startIcon={<Clear />}
                onClick={clearFilters}
                size="small"
              >
                Clear Filters
              </Button>
            </div>

            {/* Active Filters Display */}
            {(searchQuery || selectedVendor || selectedAgeRating) && (
              <div className="flex gap-2 flex-wrap">
                {searchQuery && (
                  <Chip 
                    label={`Search: "${searchQuery}"`} 
                    onDelete={() => setSearchQuery('')}
                    color="primary"
                    variant="outlined"
                  />
                )}
                {selectedVendor && (
                  <Chip 
                    label={`Vendor: ${selectedVendor}`} 
                    onDelete={() => setSelectedVendor('')}
                    color="secondary"
                    variant="outlined"
                  />
                )}
                {selectedAgeRating && (
                  <Chip 
                    label={`Age: ${selectedAgeRating}`} 
                    onDelete={() => setSelectedAgeRating('')}
                    color="info"
                    variant="outlined"
                  />
                )}
              </div>
            )}
          </Stack>
        </div>

        {/* Error Display */}
        {error && (
          <Alert severity="error" className="mb-6">
            {error}
          </Alert>
        )}

        {/* Results Count */}
        <Typography variant="body2" color="text.secondary" className="mb-4">
          Showing {filteredBooks.length} of {books.length} books
        </Typography>

        {/* Books Grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
              />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <Typography variant="h3" color="text.secondary" gutterBottom>
              No books found
            </Typography>
          </div>
        )}
      </div>
    </Container>
  );
}