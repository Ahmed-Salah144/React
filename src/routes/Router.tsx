import { Routes, Route } from "react-router-dom";

// Pages
import HomePage from "../pages/dashboard/HomePage";
import BookPostPage from "../pages/post/BookPostPage";
import BookListingsPage from "../pages/product/BookListingsPage";
import BookPage from "../pages/product/BookPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/addbook" element={<BookPostPage />} />
      <Route path="/books" element={<BookListingsPage />} />
      <Route path="/books/:id" element={<BookPage />} />
    </Routes>
  );
}
