import Activities from '../(component)/Activities';
import ProductList from '../(component)/ProductList';
import UserProfile from '../(component)/UserProfile';

const Page = () => {
  return (
    <div className='mx-auto mt-15 flex w-[335px] min-w-[335px] flex-col md:w-[510px] xl:w-[1340px] xl:flex-row xl:gap-[70px]'>
      <UserProfile />
      <div className='flex flex-col'>
        <Activities />
        <ProductList />
      </div>
    </div>
  );
};

export default Page;
