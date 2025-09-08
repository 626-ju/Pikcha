import { type Product } from '@/types/product/productType';

export function getProductColor(product: Product, products: [Product, Product]): string {
  const [product1] = products;
  return product.id === product1.id ? '#05D58B' : '#FF2F9F';
}

export function getProductColorClass(product: Product, products: [Product, Product]): string {
  const [product1] = products;
  return product.id === product1.id ? 'text-[#05D58B]' : 'text-[#FF2F9F]';
}
