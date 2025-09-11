const ProductList = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='grid grid-cols-2 gap-4 pt-[30px] md:grid-cols-3 md:gap-6 xl:grid-cols-4'>
      {children}
    </div>
  );
};
export default ProductList;
