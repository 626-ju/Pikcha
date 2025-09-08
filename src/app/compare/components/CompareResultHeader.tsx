import { type Product } from '@/types/product/productType';
import { getProductColorClass } from '@/utils/compareColors';

interface CompareResultHeaderProps {
  winner: Product | null;
  winCount: number;
  isDraw: boolean;
  products: [Product, Product];
}

const CompareResultHeader = ({ winner, winCount, isDraw, products }: CompareResultHeaderProps) => {
  return (
    <div className='flex flex-col gap-2.5 pt-14 text-center'>
      <h1 className='text-mogazoa-24px-600'>
        {isDraw ? (
          <span className='text-yellow-ffc83c'>무승부입니다.</span>
        ) : (
          <>
            <span className={getProductColorClass(winner!, products)}>{winner!.name}</span>
            이(가) 승리하였습니다!
          </>
        )}
      </h1>
      <p className='text-mogazoa-16px-400 text-gray-9fa6b2'>
        {isDraw
          ? '3가지 항목에서 동등한 결과를 보입니다.'
          : `3가지 항목 중 ${winCount}가지 항목에서 우세합니다.`}
      </p>
    </div>
  );
};

export default CompareResultHeader;
