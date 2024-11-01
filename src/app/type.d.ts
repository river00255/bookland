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
  subInfo: StoreBookSubInfo;
  [key: string]: any;
};

type StoreBookSubInfo = {
  itemPage: number;
  originalTitle: string;
  subTitle: string;
  ebbokList: {
    isbn: string;
    isbn13: string;
    itemId: string;
    link: string;
  }[];
  cardReviewImgList?: string[];
  ratingInfo: {
    commentReviewCount: number;
    myReviewCoung: number;
    ratingCount: number;
    ratingScore: number;
  };
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

export type Lib = {
  libName: string;
  libCode: string;
  homepage: string;
  address: string;
  tel: string;
  operatingTime: string;
  closed: string;
  BookCount: number;
  latitude: number;
  longitude: number;
  fax: string;
};

export type FavoriteLib = {
  name: string;
  code: string;
  region: number;
  userId: string;
};

export type FavoriteBook = {
  name: string;
  isbn: string;
  author: string;
  publisher: string;
  userId: string;
};
