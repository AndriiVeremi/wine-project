export const QUERY_KEYS = {
  wines: {
    all: ['wines'] as const,
    list: (filters: Record<string, unknown>) => ['wines', 'list', filters] as const,
    detail: (id: string) => ['wines', 'detail', id] as const,
  },
  grapes: {
    all: ['grapes'] as const,
    list: (filters: Record<string, unknown>) => ['grapes', 'list', filters] as const,
    detail: (id: string) => ['grapes', 'detail', id] as const,
  },
  wineries: {
    all: ['wineries'] as const,
    list: (filters: Record<string, unknown>) => ['wineries', 'list', filters] as const,
    detail: (id: string) => ['wineries', 'detail', id] as const,
  },
  tours: {
    all: ['tours'] as const,
    list: (filters: Record<string, unknown>) => ['tours', 'list', filters] as const,
    detail: (id: string) => ['tours', 'detail', id] as const,
  },
  regions: {
    all: ['regions'] as const,
    byCountry: (country: string) => ['regions', country] as const,
  },
};
