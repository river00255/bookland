export const LibKeys = {
  all: ['library'] as const,
  trend: ['library', 'trend'] as const,
};

export const StoreKeys = {
  all: ['store'] as const,
  best: ['store', 'best'] as const,
  search: (type: string, query: string, page: number) => [...StoreKeys.all, 'search', type, query, page] as const,
};
