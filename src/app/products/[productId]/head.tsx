import { getProductDetail } from '@/actions/productDetail';

type Props = {
  params: { productId: string };
};

export default async function Head({ params }: Props) {
  const product = await getProductDetail(Number(params.productId));

  const posterImage =
    product.image && product.image !== 'https://example.com'
      ? product.image
      : '/images/noImage.png';

  return (
    <>
      <link rel='preload' as='image' href={posterImage} />
    </>
  );
}
