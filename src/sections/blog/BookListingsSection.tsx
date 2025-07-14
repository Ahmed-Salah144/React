import { useState, useEffect } from 'react';
import {Container, Typography, CircularProgress, Alert} from '@mui/material';
import BookCard from '../../sections/product/BookCard';
import { BookService } from '../../utils/bookService';
import type { BookListing } from '../../types/BookListing';
import { vendors, ageRatings } from '../../types/BookForm';
import BookListingsFilters from './BookListingsFilters';

export default function BookListingsSection() {
  const [books, setBooks] = useState<BookListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVendor, setSelectedVendor] = useState<string>('');
  const [selectedAgeRating, setSelectedAgeRating] = useState<string>('');

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

  function parseAgeRating(rating: string) {
    if (!rating || rating === 'All Ages') return 0;
    const match = rating.match(/^\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }

  const filteredBooks = books.filter(book => {
    const matchesSearch = searchQuery === '' || 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.synopsis.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVendor = selectedVendor === '' || book.vendor === selectedVendor;
    const matchesAgeRating =
      selectedAgeRating === '' ||
      parseAgeRating(book.ageRating) <= parseAgeRating(selectedAgeRating);
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
        <Typography variant="h3" align="center">Book Collection</Typography>
        <Typography variant="body1" color="text.secondary" align="center" marginBottom={4}>Some Amazing Quote About Books</Typography>
        <div className="mb-8">
          <BookListingsFilters searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedVendor={selectedVendor} setSelectedVendor={setSelectedVendor}
            selectedAgeRating={selectedAgeRating} setSelectedAgeRating={setSelectedAgeRating} clearFilters={clearFilters} vendors={Array.from(vendors)} ageRatings={Array.from(ageRatings)}/>
        </div>
        {error && <Alert severity="error" className="mb-6">{error}</Alert>}
        <Typography variant="body2" color="text.secondary" className="mb-4">
          Showing {filteredBooks.length} of {books.length} books
        </Typography>
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map(book => <BookCard key={book.id} book={book} />)}
          </div>
        ) : (
          <div className="text-center">
            <Typography variant="h3" color="text.secondary" gutterBottom>No books found</Typography>
          </div>
        )}
      </div>
    </Container>
  );
} 