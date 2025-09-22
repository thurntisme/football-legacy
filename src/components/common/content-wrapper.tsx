import React from 'react';

import ContentError from './content-error';
import ContentLoading from './content-loading';

type Props = {
  isLoading: boolean;
  error: Error | null;
  children: React.ReactNode;
};

const ContentWrapper = ({ isLoading, error, children }: Props) => {
  if (isLoading) {
    return <ContentLoading />;
  }
  if (error) {
    return <ContentError />;
  }
  return <>{children}</>;
};

export default ContentWrapper;
