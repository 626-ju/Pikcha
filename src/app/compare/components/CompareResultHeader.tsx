import { type ProductDetail } from '@/types/product/productType';

interface CompareResultHeaderProps {
  winner: ProductDetail | null;
  winCount: number;
  isDraw: boolean;
  products: [ProductDetail, ProductDetail];
}

const TOTAL_COMPARISON_ITEMS = 3;

const CompareResultHeader = ({ winner, winCount, isDraw, products }: CompareResultHeaderProps) => {
  if (isDraw) {
    return (
      <div className='flex flex-col gap-2.5 text-center'>
        <h1 className='text-mogazoa-24px-600'>
          <span className='text-yellow-ffc83c'>무승부입니다.</span>
        </h1>
        <p className='text-mogazoa-16px-400 text-gray-9fa6b2'>
          {TOTAL_COMPARISON_ITEMS}가지 항목에서 동등한 결과를 보입니다.
        </p>
      </div>
    );
  }

  if (!winner) return null;

  // 승자 색상 결정 (첫 번째 제품이면 초록, 두 번째면 분홍)
  const winnerColorClass = winner.id === products[0].id ? 'text-[#05D58B]' : 'text-[#FF2F9F]';

  return (
    <div className='flex flex-col gap-2.5 text-center'>
      <h1 className='text-mogazoa-24px-600'>
        <span className={winnerColorClass}>{winner.name}</span>
        이(가) 승리하였습니다!
      </h1>
      <p className='text-mogazoa-16px-400 text-gray-9fa6b2'>
        {TOTAL_COMPARISON_ITEMS}가지 항목 중 {winCount}가지 항목에서 우세합니다.
      </p>
    </div>
  );
};

export default CompareResultHeader;
