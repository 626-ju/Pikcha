'use client';

import { ReactNode } from 'react';

import Loading from '@/components/common/LoadingSpinner';

interface Props {
  isLoading: boolean;
  fallback?: ReactNode;
  children?: ReactNode;
}

const SuspenseLike = ({ isLoading, fallback = <Loading />, children }: Props) => {
  return <> {isLoading ? fallback : children}</>;
};

export default SuspenseLike;
