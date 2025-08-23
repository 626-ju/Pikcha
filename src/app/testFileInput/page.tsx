import FileInput from '@/components/FileInput';

const testFileInput = () => {
  return (
    <div className='p-10'>
      <FileInput />
      <div className='flex flex-row flex-nowrap gap-4 overflow-x-auto'>
        <FileInput maxFiles={3} />
      </div>

      <FileInput maxFiles={3} />
    </div>
  );
};

export default testFileInput;
