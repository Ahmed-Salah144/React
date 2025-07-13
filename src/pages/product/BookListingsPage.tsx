import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
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

import { Search, FilterList, Clear } from '@mui/icons-material';
import ItemCard from '../../sections/product/ItemCard';
import { BookService } from '../../lib/bookService';
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

  const handleAddToCart = (book: BookListing) => {
    // TODO: Implement add to cart functionality
    console.log('Adding to cart:', book.title);
  };

  const handleToggleFavorite = (book: BookListing) => {
    // TODO: Implement favorite functionality
    console.log('Toggling favorite for:', book.title);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedVendor('');
    setSelectedAgeRating('');
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Book Collection
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
          Discover our amazing collection of books
        </Typography>

        {/* Search and Filters */}
        <Box sx={{ mb: 4 }}>
          <Stack spacing={2}>
            {/* Search Bar */}
            <TextField
              fullWidth
              placeholder="Search books by title, author, or synopsis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />

            {/* Filters */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
              <FilterList color="action" />
              
              <FormControl sx={{ minWidth: 150 }}>
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

              <FormControl sx={{ minWidth: 150 }}>
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
            </Box>

            {/* Active Filters Display */}
            {(searchQuery || selectedVendor || selectedAgeRating) && (
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
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
              </Box>
            )}
          </Stack>
        </Box>

        {/* Error Display */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Results Count */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Showing {filteredBooks.length} of {books.length} books
        </Typography>

        {/* Books Grid */}
        {filteredBooks.length > 0 ? (
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 3 }}>
            {filteredBooks.map((book) => (
              <ItemCard
                key={book.id}
                book={book}
                onAddToCart={handleAddToCart}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No books found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search criteria or filters
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}