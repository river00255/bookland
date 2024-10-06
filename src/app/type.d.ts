export type LibBookItem = {
  authors: string;
  bookImageURL: string;
  bookDtlURL: string;
  bookname: string;
  class_nm: string;
  class_no: string;
  isbn13: string;
  publisher: string;
  publication_year: string;
  [key: string]: string;
};

export type StoreBookItem = {
  title: string;
  link: string;
  author: string;
  pubDate: string;
  description: string;
  publisher: string;
  isbn: string;
  isbn13: string;
  itemId: string;
  imteId: string;
  categoryId: string;
  categoryName: string;
  priceSales: number;
  priceStandard: number;
  cover: string;
  [key: string]: any;
};

export type ItemSearch = {
  item: StoreBookItem[];
  itemPerPage: number;
  totalResults: number;
  title: string;
  searchCategoryName: string;
  startIndex: number;
  [key: string]: any;
};
