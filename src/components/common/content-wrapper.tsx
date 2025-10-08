import React from "react";

import ContentError from "./content-error";
import ContentLoading from "./content-loading";

type Props = {
  isLoading: boolean;
  error: Error | null;
  children: React.ReactNode;
  onRefetch?: () => void;
};

const ContentWrapper = ({ isLoading, error, children, onRefetch }: Props) => {
  const handleRetry = () => {
    if (onRefetch) {
      onRefetch();
    }
  };

  if (isLoading) {
    return <ContentLoading />;
  }
  if (error) {
    return <ContentError onRetry={handleRetry} />;
  }
  return <>{children}</>;
};

export default ContentWrapper;
