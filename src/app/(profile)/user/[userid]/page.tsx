import Activities from '../../(component)/Activities';
import ProductList from '../../(component)/ProductList';
import ProfileCard from '../../(component)/ProfileCard';

interface Props {
  params: Promise<{ userid: string }>;
}

const Page = async ({ params }: Props) => {
  const { userid } = await params;

  return (
    <div className='mx-auto mt-15 flex w-[335px] min-w-[335px] flex-col md:w-[510px] xl:w-full xl:max-w-[1340px] xl:flex-row xl:justify-between'>
      <ProfileCard userid={userid} />
      <div className='flex flex-col'>
        <Activities userid={userid} />
        <ProductList userid={userid} />
      </div>
    </div>
  );
};

export default Page;
