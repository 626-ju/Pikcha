import React from 'react';

import SortDropdown from '@/components/common/dropdowns/SortDropdown';

const DropdownTrigger = () => {
  return (
    <div className='text-mogazoa-18px-600 mt-15 mb-7.5 xl:mt-20'>
      <SortDropdown variant={'product'} />
    </div>
  );
};

export default DropdownTrigger;
