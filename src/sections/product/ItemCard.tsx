import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Rating,
  IconButton,
  CardActions,
} from '@mui/material';
import { Favorite, FavoriteBorder, ShoppingCart } from '@mui/icons-material';
import { useState } from 'react';
import type { BookListing } from '../../types/BookListing';

interface ItemCardProps {
  book: BookListing;
  onAddToCart?: (book: BookListing) => void;
  onToggleFavorite?: (book: BookListing) => void;
}

export default function ItemCard({ book, onAddToCart, onToggleFavorite }: ItemCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    onToggleFavorite?.(book);
  };

  const handleAddToCart = () => {
    onAddToCart?.(book);
  };

  // Truncate synopsis to show only first 150 characters
  const truncatedSynopsis = book.synopsis.length > 150 
    ? `${book.synopsis.substring(0, 150)}...` 
    : book.synopsis;

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      {/* Cover Image */}
      <CardMedia
        component="img"
        height="280"
        image={book.cover || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjI4MCIgdmlld0JveD0iMCAwIDI4MCAyODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyODAiIGhlaWdodD0iMjgwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xNDAgMTQwTDEwMCAxMDBIMTgwTDE0MCAxNDBaIiBmaWxsPSIjQ0NDIi8+Cjx0ZXh0IHg9IjE0MCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPk5vIENvdmVyPC90ZXh0Pgo8L3N2Zz4K'}
        alt={book.title}
        sx={{
          objectFit: 'cover',
          backgroundColor: '#f5f5f5',
        }}
      />

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Title */}
        <Typography 
          variant="h6" 
          component="h3" 
          gutterBottom
          sx={{ 
            fontWeight: 600,
            lineHeight: 1.2,
            minHeight: '2.4em',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {book.title}
        </Typography>

        {/* Author */}
        <Typography 
          variant="body2" 
          color="text.secondary" 
          gutterBottom
          sx={{ fontStyle: 'italic' }}
        >
          by {book.author}
        </Typography>

        {/* Vendor and Age Rating */}
        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          <Chip 
            label={book.vendor} 
            size="small" 
            variant="outlined"
            color="primary"
          />
          <Chip 
            label={book.ageRating} 
            size="small" 
            variant="outlined"
            color="secondary"
          />
        </Box>

        {/* Synopsis */}
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            flexGrow: 1,
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.4,
          }}
        >
          {truncatedSynopsis}
        </Typography>

        {/* Book Details */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {book.numberOfPages} pages
          </Typography>
          <Typography variant="h6" color="primary" fontWeight="bold">
            ${book.price.toFixed(2)}
          </Typography>
        </Box>
      </CardContent>

      {/* Actions */}
      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <IconButton 
          onClick={handleToggleFavorite}
          color={isFavorite ? 'error' : 'default'}
          size="small"
        >
          {isFavorite ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
        
        <IconButton 
          onClick={handleAddToCart}
          color="primary"
          size="small"
          sx={{ 
            backgroundColor: 'primary.main',
            color: 'white',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
        >
          <ShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
}
