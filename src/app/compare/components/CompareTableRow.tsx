import FavoriteIcon from '@/assets/icon/Icon-favorite.svg';
import ReviewIcon from '@/assets/icon/Icon-review.svg';
import StarIcon from '@/assets/icon/Icon-star.svg';
import { type Product } from '@/types/product/productType';
import { getProductColorClass } from '@/utils/compareColors';

interface CompareTableRowProps {
  label: string;
  value1: number;
  value2: number;
  winner: Product | null;
  products: [Product, Product];
}

const CompareTableRow = ({ label, value1, value2, winner, products }: CompareTableRowProps) => {
  const [product1, product2] = products;

  const getIcon = () => {
    if (label === '별점') return <StarIcon className='text-yellow-ffc83c mr-1 inline h-4 w-4' />;
    if (label === '찜 개수')
      return <FavoriteIcon className='text-red-ff2f9f mr-1 inline h-4 w-4' />;
    if (label === '리뷰 개수') return <ReviewIcon className='mr-1 inline h-4 w-4 text-gray-400' />;
    return null;
  };

  return (
    <tr className='border-black-2e2e3a border-b'>
      <td className='text-mogazoa-16px-400 text-gray-9fa6b2 px-[40px] py-7 text-center'>{label}</td>
      <td
        className={`text-mogazoa-16px-400 px-[40px] py-7 text-center ${winner?.id === product1.id ? `${getProductColorClass(product1, products)} text-mogazoa-16px-600` : 'text-white-f1f1f5'}`}
      >
        <div className='flex items-center justify-center'>
          {getIcon()}
          {label === '별점' ? (value1 === 0 ? '0' : value1.toFixed(1)) : value1.toLocaleString()}
        </div>
      </td>
      <td
        className={`text-mogazoa-16px-400 px-[40px] py-7 text-center ${winner?.id === product2.id ? `${getProductColorClass(product2, products)} text-mogazoa-16px-600` : 'text-white-f1f1f5'}`}
      >
        <div className='flex items-center justify-center'>
          {getIcon()}
          {label === '별점' ? (value2 === 0 ? '0' : value2.toFixed(1)) : value2.toLocaleString()}
        </div>
      </td>
      <td className='p-4 text-center'>
        {winner ? (
          <span className={`${getProductColorClass(winner, products)} text-mogazoa-16px-400`}>
            {winner.name} 승리 🎉
          </span>
        ) : (
          <span className='text-mogazoa-16px-400 text-white-f1f1f5'>무승부</span>
        )}
      </td>
    </tr>
  );
};

export default CompareTableRow;
