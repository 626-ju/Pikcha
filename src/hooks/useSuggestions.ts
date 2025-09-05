import { useEffect, useState } from 'react';

import { suggestProducts } from '@/actions/productList';

import { useDebounce } from './useDebounce';

type SuggestionProduct = { id: number; name: string; categoryId: number };

export function useSuggestions(query: string, delay: number = 250) {
  const [suggestions, setSuggestions] = useState<SuggestionProduct[]>([]);
  const debouncedQuery = useDebounce(query, delay);

  useEffect(() => {
    if (!debouncedQuery) {
      setSuggestions([]);
      return;
    }

    let cancelled = false;
    suggestProducts(debouncedQuery).then((list) => {
      if (!cancelled) setSuggestions(list);
    });

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  return suggestions;
}
