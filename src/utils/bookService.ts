import type { BookListing } from '../types/BookListing';

export class BookService {
  private static API_BASE_URL = 'http://localhost:3001';

  // Get all books from the database
  static async getBooks(): Promise<BookListing[]> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/books`);
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const books = await response.json();
      return books;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw new Error('Failed to fetch books from database');
    }
  }

  // Get a single book by ID
  static async getBookById(id: number): Promise<BookListing | null> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/books/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error('Failed to fetch book');
      }
      const book = await response.json();
      return book;
    } catch (error) {
      console.error('Error fetching book:', error);
      throw new Error('Failed to fetch book from database');
    }
  }

  // Add a new book
  static async addBook(book: BookListing): Promise<BookListing> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add book');
      }
      
      const newBook = await response.json();
      return newBook;
    } catch (error) {
      console.error('Error adding book:', error);
      throw new Error('Failed to add book to database');
    }
  }

  // Update an existing book
  static async updateBook(id: number, updatedBook: BookListing): Promise<BookListing> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBook),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update book');
      }
      
      const book = await response.json();
      return book;
    } catch (error) {
      console.error('Error updating book:', error);
      throw new Error('Failed to update book in database');
    }
  }

  // Delete a book
  static async deleteBook(id: number): Promise<void> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/books/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete book');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      throw new Error('Failed to delete book from database');
    }
  }

  // Search books by title or author
  static async searchBooks(query: string): Promise<BookListing[]> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/books?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to search books');
      }
      const books = await response.json();
      return books;
    } catch (error) {
      console.error('Error searching books:', error);
      throw new Error('Failed to search books in database');
    }
  }

  // Get books by vendor
  static async getBooksByVendor(vendor: string): Promise<BookListing[]> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/books?vendor=${encodeURIComponent(vendor)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch books by vendor');
      }
      const books = await response.json();
      return books;
    } catch (error) {
      console.error('Error fetching books by vendor:', error);
      throw new Error('Failed to fetch books by vendor from database');
    }
  }

  // Get books by age rating
  static async getBooksByAgeRating(ageRating: string): Promise<BookListing[]> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/books?ageRating=${encodeURIComponent(ageRating)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch books by age rating');
      }
      const books = await response.json();
      return books;
    } catch (error) {
      console.error('Error fetching books by age rating:', error);
      throw new Error('Failed to fetch books by age rating from database');
    }
  }
} 