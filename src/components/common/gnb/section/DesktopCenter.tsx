import { Suspense } from 'react';

import SearchForm from '../searchForm/SearchForm';

const DesktopCenter = () => {
  return (
    <Suspense>
      <SearchForm />
    </Suspense>
  );
};

export default DesktopCenter;
