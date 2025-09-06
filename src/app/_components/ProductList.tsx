const ProductList = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='grid grid-cols-3 gap-4 pt-[30px] md:gap-6 lg:grid-cols-3 xl:grid-cols-4'>
      {children}
    </div>
  );
};
export default ProductList;
