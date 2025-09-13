import { useEffect, useState } from 'react';

import { ProductDetail } from '@/types/product/productType';

interface UseCompareProductsResult {
  products: ProductDetail[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useCompareProducts(productIds: number[]): UseCompareProductsResult {
  const [products, setProducts] = useState<ProductDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      const uniqueIds = Array.from(new Set(productIds.filter((n) => Number.isFinite(n))));

      if (uniqueIds.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const qs = new URLSearchParams({ ids: uniqueIds.join(',') }).toString();
        const res = await fetch(`/api/products/batch?${qs}`, { signal: controller.signal });
        if (!res.ok) throw new Error('Failed to fetch');
        const data: { list: ProductDetail[] } = await res.json();
        setProducts(data.list ?? []);
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return;
        setError('영화 정보를 불러오는 데 실패했습니다.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    return () => controller.abort();
  }, [productIds, refreshKey]);

  const refetch = () => setRefreshKey((prev) => prev + 1);

  return { products, loading, error, refetch };
}
