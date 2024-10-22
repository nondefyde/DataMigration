'use client';
import { mediaSize, useMediaQuery } from '@/_shared/components/responsiveness';
import { WithLoaderRender } from '@/_shared/components/with-app-loder';
import CurrentEnvironment from '@/components/types/current-environment';
import TypesHeader from '@/components/types/layout/header';
import CustomTabs from '@/components/types/layout/lib/custom-tabs';
import React, { ReactElement } from 'react';

export interface TypesLayoutProps {
  children: ReactElement | ReactElement[];
}

const TypesLayout = ({ children }: TypesLayoutProps) => {
  const isMobile = useMediaQuery(mediaSize.mobile);
  const tabItems = [
    {
      label: 'quest',
      path: 'quest',
    },
    {
      label: 'migrations',
      path: 'migrations',
    },
  ];

  return (
    <WithLoaderRender loading={false} theme="light" mobileResponsive={isMobile}>
      <div className="min-h-screen bg-background">
        <TypesHeader />
        <div className="container mx-auto px-4">
          <CurrentEnvironment />
          <CustomTabs tabItems={tabItems} />
          {children}
        </div>
      </div>
    </WithLoaderRender>
  );
};

export default TypesLayout;
