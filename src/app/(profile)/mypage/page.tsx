import { getMyInfo } from '@/actions/profile/getUserInfo';
import { getUserProducts } from '@/actions/profile/getUserProducts';

import Activities from '../(component)/Activities';
import ProductList from '../(component)/ProductList';
import ProfileCard from '../(component)/ProfileCard';

const Page = async () => {
  const data = await getMyInfo();
  const userid = data.id;
  const parsedId = Number(userid);

  const productData = await getUserProducts(parsedId, 'created-products');
  const initialMoiveList = productData.list;

  return (
    <div className='mx-auto mt-15 flex w-[335px] min-w-[335px] flex-col md:w-[510px] xl:w-full xl:max-w-[1340px] xl:flex-row xl:justify-between'>
      <ProfileCard userid={parsedId} myPage={true} />
      <div className='flex flex-col'>
        <Activities userid={parsedId} />
        <ProductList userid={parsedId} initailData={initialMoiveList} />
      </div>
    </div>
  );
};

export default Page;
