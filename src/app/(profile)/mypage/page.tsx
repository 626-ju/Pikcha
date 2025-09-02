import { getMyInfo } from '@/actions/profile/getUserInfo';
import { getUserProducts } from '@/actions/profile/getUserProducts';

import Activities from '../(component)/Activities';
import ProductList from '../(component)/ProductList';
import ProfileCard from '../(component)/ProfileCard';

const Page = async () => {
  const data = await getMyInfo();
  const userid = data.id;
  const parsedId = Number(userid);

  const productData = await getUserProducts(parsedId, 'reviewed-products');
  const initialMoiveList = productData.list;

  return (
    //335->296//510->470//1340->1240(940->820)
    <div className='mx-auto mt-15 flex w-[296px] min-w-[296px] flex-col md:w-[470px] xl:w-full xl:max-w-[1240px] xl:flex-row xl:justify-between'>
      <ProfileCard userid={parsedId} myPage={true} />
      <div className='flex max-w-[820px] flex-col'>
        <Activities userid={parsedId} />
        <ProductList userid={parsedId} initialData={initialMoiveList} />
      </div>
    </div>
  );
};

export default Page;
