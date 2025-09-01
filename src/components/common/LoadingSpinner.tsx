import React from 'react';

const Loading = () => {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <div className='relative my-54 h-16 w-16'>
        <div className='absolute inset-0 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500'></div>
        <div className='absolute inset-0 animate-spin rounded-full border-4 border-gray-200 border-t-purple-500 delay-150'></div>
      </div>
    </div>
  );
};

export default Loading;
