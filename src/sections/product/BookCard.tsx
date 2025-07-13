import {Card,CardContent,CardMedia,Typography,Box,Chip, Button} from '@mui/material';
import type { BookListing } from '../../types/BookListing';
import { useState } from 'react';

export default function ItemCard({ book }: {book: BookListing;}) {
  // Truncate synopsis to show only first 150 characters
  const truncatedSynopsis = book.synopsis.length > 100 ? `${book.synopsis.substring(0, 100)}...`  : book.synopsis;
  const [showMore, setshowMore] = useState(false);
  return (
    <Card>
      {/* Cover Image */}
      <CardMedia component="img" height="380" image={book.cover || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjI4MCIgdmlld0JveD0iMCAwIDI4MCAyODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyODAiIGhlaWdodD0iMjgwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xNDAgMTQwTDEwMCAxMDBIMTgwTDE0MCAxNDBaIiBmaWxsPSIjQ0NDIi8+Cjx0ZXh0IHg9IjE0MCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPk5vIENvdmVyPC90ZXh0Pgo8L3N2Zz4K'} alt={book.title}/>
      <CardContent>
        {/* Title */}
        <Typography fontSize={20} fontWeight={600}>
          {book.title}
        </Typography>
        {/* Author */}
        <Typography fontStyle="italic" fontSize={14} color="text.secondary">
          by {book.author}
        </Typography>
        {/* Vendor and Age Rating */}
        <Box sx={{gap: 5, mb: 2, mt: 2}}>
          <Chip label={book.vendor} size="small" variant="outlined" color="primary" sx={{marginRight : 1}} />
          <Chip label={book.ageRating} size="small" variant="outlined" color="secondary" sx={{marginRight : 1}} />
        </Box>

        {/* Synopsis */}
        <Typography marginRight={2} sx={{wordWrap: 'break-word'}}>
          {showMore?  book.synopsis : truncatedSynopsis}
        </Typography>

        <Button onClick={() => {
          setshowMore(!showMore)
        }} size="small">
          {showMore? "Show Less" : "Show More"}
        </Button>

        {/* Book Details */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, marginTop : 5}}>
          <Typography>
            {book.numberOfPages} pages
          </Typography>
          <Typography color="primary" fontWeight="bold">
            ${book.price.toFixed(2)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
