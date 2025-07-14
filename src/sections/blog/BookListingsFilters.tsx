import type { Dispatch, SetStateAction } from 'react';
import { Stack, TextField, FormControl, InputLabel, Select, MenuItem, Button, Chip } from '@mui/material';
import { Clear } from '@mui/icons-material';

interface BookListingsFiltersProps {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  selectedVendor: string;
  setSelectedVendor: Dispatch<SetStateAction<string>>;
  selectedAgeRating: string;
  setSelectedAgeRating: Dispatch<SetStateAction<string>>;
  clearFilters: () => void;
  vendors: string[];
  ageRatings: string[];
}

export default function BookListingsFilters({
  searchQuery,
  setSearchQuery,
  selectedVendor,
  setSelectedVendor,
  selectedAgeRating,
  setSelectedAgeRating,
  clearFilters,
  vendors,
  ageRatings,
}: BookListingsFiltersProps) {
  return (
    <Stack spacing={2}>
      <TextField fullWidth placeholder="Search books by title, author, or synopsis..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
      <div className="flex gap-6">
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Vendor</InputLabel>
          <Select value={selectedVendor} label="Vendor" onChange={e => setSelectedVendor(e.target.value)} size="small">
            <MenuItem value="">All Vendors</MenuItem>
            {vendors.map(vendor => <MenuItem key={vendor} value={vendor}>{vendor}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Age Rating</InputLabel>
          <Select value={selectedAgeRating} label="Age Rating" onChange={e => setSelectedAgeRating(e.target.value)} size="small">
            <MenuItem value="">All Ages</MenuItem>
            {ageRatings.map(rating => <MenuItem key={rating} value={rating}>{rating}</MenuItem>)}
          </Select>
        </FormControl>
        <Button variant="outlined" startIcon={<Clear />} onClick={clearFilters} size="small">Clear Filters</Button>
      </div>
      {(searchQuery || selectedVendor || selectedAgeRating) && (
        <div className="flex gap-2 flex-wrap">
          {searchQuery && (
            <Chip label={`Search: "${searchQuery}"`} onDelete={() => setSearchQuery('')} color="primary" variant="outlined" />
          )}
          {selectedVendor && (
            <Chip label={`Vendor: ${selectedVendor}`} onDelete={() => setSelectedVendor('')} color="secondary" variant="outlined" />
          )}
          {selectedAgeRating && (
            <Chip label={`Age: ${selectedAgeRating}`} onDelete={() => setSelectedAgeRating('')} color="info" variant="outlined" />
          )}
        </div>
      )}
    </Stack>
  );
} 