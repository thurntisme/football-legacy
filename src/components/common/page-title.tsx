import React from 'react';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { FOOTBALL_STATS_URL } from '@/constants/site';

type Props = {
  title?: string;
  subTitle?: string;
  children?: React.ReactNode;
};

const PageTitle = ({ title, subTitle, children }: Props) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold">{title || ''}</h1>
        {subTitle && <p className="text-muted-foreground mt-1">{subTitle}</p>}
      </div>
      <div className="space-x-2">
        {children ? (
          children
        ) : (
          <Button asChild>
            <Link href={`${FOOTBALL_STATS_URL}/dashboard`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default PageTitle;
