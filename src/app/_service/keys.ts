export const LibKeys = {
  all: ['library'] as const,
  libs: (region: number, page: number) => [...LibKeys.all, region, page] as const,
  libDetail: (code: string) => [...LibKeys.all, 'detail', code] as const,
  trend: ['library', 'trend'] as const,
};

export const StoreKeys = {
  all: ['store'] as const,
  best: ['store', 'best'] as const,
  bookDetail: (isbn: string) => [...StoreKeys.all, 'detail', isbn] as const,
  search: (type: string, query: string, page: number) => [...StoreKeys.all, 'search', query, type, page] as const,
};
