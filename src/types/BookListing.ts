export interface BookListing {
    id?: number;
    cover?: string;           // base64 image string
    title: string;
    vendor: string;
    author: string;
    numberOfPages: number;
    synopsis: string;
    price: number;
    ageRating: "3+" | "12+" | "16+";
  }