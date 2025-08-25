import FileInput from '@/components/FileInput';

const testFileInput = () => {
  return (
    <div className='p-10'>
      <FileInput />
      <FileInput maxFiles={3} />
    </div>
  );
};

export default testFileInput;
