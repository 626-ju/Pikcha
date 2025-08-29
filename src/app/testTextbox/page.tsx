import Textbox from '@/components/common/Textbox';

const testTextbox = () => {
  return (
    <div className='flex flex-col gap-10 p-10'>
      <Textbox placeholder='리뷰를 작성해 주세요' maxLength={300} />
      <Textbox placeholder='리뷰를 작성해 주세요' maxLength={500} />
      <Textbox placeholder='리뷰를 작성해 주세요' maxLength={1000} />
    </div>
  );
};

export default testTextbox;
