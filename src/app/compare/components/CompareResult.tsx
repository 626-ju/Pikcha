import { useEffect, useState } from 'react';

import { toast } from 'sonner';

import { getHtmlJustWatch } from '@/actions/external/getHtmlJustWatch';
import { StreamingIcon } from '@/app/testTrailer/StreamingIcon';
import Button from '@/components/ui/Buttons';
import { type ProviderInfo } from '@/types/justwatch/providers';
import { type ProductDetail } from '@/types/product/productType';
import { compareProducts } from '@/utils/compareProducts';

import CompareMovieCards from './CompareMovieCards';
import CompareResultHeader from './CompareResultHeader';
import CompareTable from './CompareTable';

interface CompareResultProps {
  products: [ProductDetail, ProductDetail];
  onBackToSelection: () => void;
}

const CompareResult = ({ products, onBackToSelection }: CompareResultProps) => {
  const [latestProducts, setLatestProducts] = useState(products);
  const comparisonResult = compareProducts(latestProducts[0], latestProducts[1]);
  const [hasStreamingProviders, setHasStreamingProviders] = useState(false);
  const [providers, setProviders] = useState<ProviderInfo[]>([]);

  // 컴포넌트 마운트 시 최신 데이터 가져오기
  useEffect(() => {
    const fetchLatestData = async () => {
      try {
        const productIds = products.map((p) => p.id);
        const qs = new URLSearchParams({ ids: productIds.join(','), force: 'true' }).toString();
        const response = await fetch(`/api/products/batch?${qs}`, { cache: 'no-store' });

        if (response.ok) {
          const data = await response.json();
          if (data.list?.length === 2) {
            setLatestProducts([data.list[0], data.list[1]]);
          }
        }
      } catch (error) {
        console.error('Failed to fetch latest data:', error);
      }
    };

    fetchLatestData();
  }, [products]);

  useEffect(() => {
    const checkStreamingProviders = async () => {
      if (!comparisonResult.winner) return;

      try {
        const providerList = await getHtmlJustWatch(comparisonResult.winner.name);
        setProviders(providerList);
        setHasStreamingProviders(providerList.length > 0);
      } catch {
        setHasStreamingProviders(false);
      }
    };

    checkStreamingProviders();
  }, [comparisonResult.winner]);

  const handleShowStreaming = async () => {
    toast(<StreamingIcon providers={providers} moviePosterUrl={comparisonResult.winner?.image} />, {
      duration: 30 * 1000,
      position: 'bottom-right',
      style: { minWidth: 0, width: 'auto' },
    });
  };

  return (
    <div className='space-y-12'>
      <CompareResultHeader
        winner={comparisonResult.winner}
        winCount={comparisonResult.winCount}
        isDraw={comparisonResult.isDraw}
        products={latestProducts}
      />

      <CompareMovieCards products={latestProducts} comparisonResult={comparisonResult} />

      <CompareTable products={latestProducts} comparisonResult={comparisonResult} />

      <div className='mt-8 space-y-4 text-center'>
        {comparisonResult.winner && hasStreamingProviders && (
          <Button variant='primary' onClick={handleShowStreaming}>
            🎬 승리 영화 보러가기
          </Button>
        )}

        <div>
          <Button variant='tertiary' onClick={onBackToSelection}>
            다른 영화 비교하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompareResult;
