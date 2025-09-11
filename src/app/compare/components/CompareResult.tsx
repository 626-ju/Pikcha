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
  const comparisonResult = compareProducts(products[0], products[1]);
  const [hasStreamingProviders, setHasStreamingProviders] = useState(false);
  const [providers, setProviders] = useState<ProviderInfo[]>([]);

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
    toast(<StreamingIcon providers={providers} />, {
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
        products={products}
      />

      <CompareMovieCards products={products} comparisonResult={comparisonResult} />

      <CompareTable products={products} comparisonResult={comparisonResult} />

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
