export const LibKeys = {
  all: ['library'] as const,
  libs: (region: number, page: number) =>
    [...LibKeys.all, region, page] as const,
  libDetail: (code: string) => [...LibKeys.all, 'detail', code] as const,
  trend: ['library', 'trend'] as const,
  loan: (code: string, isbn: string) =>
    [...LibKeys.all, 'loan', code, isbn] as const,
};

export const StoreKeys = {
  all: ['store'] as const,
  best: ['store', 'best'] as const,
  bookDetail: (isbn: string) => [...StoreKeys.all, 'detail', isbn] as const,
  search: (type: string, query: string, page: number) =>
    [...StoreKeys.all, 'search', query, type, page] as const,
};

export const BookmarkKeys = {
  all: ['bookmark'] as const,
  list: (userId: string) => [...BookmarkKeys.all, 'list', userId] as const,
  libList: (userId: string) => [...BookmarkKeys.all, 'lib', userId] as const,
  libItem: (userId: string, code: string) =>
    [...BookmarkKeys.all, 'lib', userId, code] as const,
  bookItem: (userId: string, isbn: string) =>
    [...BookmarkKeys.all, 'book', userId, isbn] as const,
  bookList: (userId: string) => [...BookmarkKeys.all, 'book', userId] as const,
};
