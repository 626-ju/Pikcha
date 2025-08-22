import Textbox from '@/components/Textbox';

const testTextbox = () => {
  return (
    <div className='p-10 flex flex-col gap-10'>
      <Textbox placeholder='리뷰를 작성해 주세요' size='lg' maxLength={300} />
      <Textbox placeholder='리뷰를 작성해 주세요' size='md' maxLength={500} />
      <Textbox placeholder='리뷰를 작성해 주세요' size='sm' maxLength={1000} />
    </div>
  );
};

export default testTextbox;
