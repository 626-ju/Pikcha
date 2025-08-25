import { getMyInfo } from '@/actions/profile/getUserInfo';

import Activities from '../(component)/Activities';
import ProductList from '../(component)/ProductList';
import ProfileCard from '../(component)/ProfileCard';

const Page = async () => {
  const data = await getMyInfo();
  const userid = data.id;
  const parsedId = Number(userid);

  return (
    <div className='mx-auto mt-15 flex w-[335px] min-w-[335px] flex-col md:w-[510px] xl:w-full xl:max-w-[1340px] xl:flex-row xl:justify-between'>
      <ProfileCard userid={parsedId} />
      <div className='flex flex-col'>
        <Activities userid={parsedId} />
        <ProductList userid={parsedId} />
      </div>
    </div>
  );
};

export default Page;
