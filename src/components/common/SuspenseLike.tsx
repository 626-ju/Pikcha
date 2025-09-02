'use client';

import { ReactNode } from 'react';

import Loading from '@/components/common/LoadingSpinner';

interface Props {
  isLoading: boolean;
  fallback?: ReactNode;
  children?: ReactNode;
  infinite?: boolean;
}

const SuspenseLike = ({ isLoading, fallback = <Loading />, children }: Props) => {
  return (
    <>
      {children}
      {isLoading && fallback}
    </>
  );
};

export default SuspenseLike;
