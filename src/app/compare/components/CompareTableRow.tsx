import FavoriteIcon from '@/assets/icon/Icon-favorite.svg';
import ReviewIcon from '@/assets/icon/Icon-review.svg';
import StarIcon from '@/assets/icon/Icon-star.svg';
import { type ProductDetail } from '@/types/product/productType';

interface CompareTableRowProps {
  label: string;
  value1: number;
  value2: number;
  winner: ProductDetail | null;
  products: [ProductDetail, ProductDetail];
}

const ICON_MAP = {
  별점: <StarIcon className='text-yellow-ffc83c mr-1 inline h-4 w-4' />,
  '찜 개수': <FavoriteIcon className='text-red-ff2f9f mr-1 inline h-4 w-4' />,
  '리뷰 개수': <ReviewIcon className='mr-1 inline h-4 w-4 text-gray-400' />,
} as const;

const CompareTableRow = ({ label, value1, value2, winner, products }: CompareTableRowProps) => {
  const icon = ICON_MAP[label as keyof typeof ICON_MAP];

  const formatValue = (value: number) => {
    return label === '별점' ? (value === 0 ? '0' : value.toFixed(1)) : value.toLocaleString();
  };

  const getProductColor = (product: ProductDetail) => {
    return product.id === products[0].id ? 'text-[#05D58B]' : 'text-[#FF2F9F]';
  };

  const getCellClass = (product: ProductDetail) => {
    const isWinner = winner?.id === product.id;
    return `text-mogazoa-16px-400 px-[40px] py-7 text-center ${
      isWinner ? `${getProductColor(product)} text-mogazoa-16px-600` : 'text-white-f1f1f5'
    }`;
  };

  const baseCellClass = 'text-mogazoa-16px-400 text-gray-9fa6b2 px-[40px] py-7 text-center';

  return (
    <tr className='border-black-2e2e3a border-b'>
      <td className={baseCellClass}>{label}</td>
      <td className={getCellClass(products[0])}>
        <div className='flex items-center justify-center'>
          {icon}
          {formatValue(value1)}
        </div>
      </td>
      <td className={getCellClass(products[1])}>
        <div className='flex items-center justify-center'>
          {icon}
          {formatValue(value2)}
        </div>
      </td>
      <td className={baseCellClass}>
        {winner ? (
          <span className={`${getProductColor(winner)} text-mogazoa-16px-400`}>
            <span className='whitespace-nowrap'>{winner.name}</span>
            <br /> 승리 🎉
          </span>
        ) : (
          <span className='text-mogazoa-16px-400 text-white-f1f1f5'>무승부</span>
        )}
      </td>
    </tr>
  );
};

export default CompareTableRow;
