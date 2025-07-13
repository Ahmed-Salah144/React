import { z } from "zod";

export const vendors = ["Amazon", "Barnes & Noble", "Local Store"] as const;
export type Vendor = typeof vendors[number];

export const ageRatings = ["3+", "12+", "16+"] as const;
export type AgeRating = typeof ageRatings[number];

export const BookForm = z.object({
  title: z.string().min(1, "Title is required"),
  vendor: z.enum(vendors,"Please select a Vendor"),
  author: z.string().min(1, "Author is required"),
  numberOfPages: z.number().min(1, "Number of pages must be greater than 0"),
  synopsis: z.string().min(100, "Synopsis must be at least 100 characters"),
  price: z.number().positive("Price must be greater than 0"),
  ageRating: z.enum(ageRatings,"Please select a Rating"),
});

export const defaultBookFormValues: BookFormData = {
  title: "",
  vendor: vendors[0],
  author: "",
  numberOfPages: 1,
  synopsis: "",
  price: 1,
  ageRating: "3+",
};
export type BookFormData = z.infer<typeof BookForm>;
