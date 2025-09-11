import { useEffect, useState } from 'react';

import { getBatchProductDetails } from '@/actions/compareProducts';
import { ProductDetail } from '@/types/product/productType';

interface UseCompareProductsResult {
  products: ProductDetail[];
  loading: boolean;
  error: string | null;
}

export function useCompareProducts(productIds: number[]): UseCompareProductsResult {
  const [products, setProducts] = useState<ProductDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      if (productIds.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const validProducts = await getBatchProductDetails(productIds);
        setProducts(validProducts);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('상품 정보를 불러오는 데 실패했습니다.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [productIds]);

  return { products, loading, error };
}
