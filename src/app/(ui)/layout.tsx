'use client';
import React, { ReactElement } from 'react';
import { App, ConfigProvider } from 'antd';
import { useTheme } from 'next-themes';
import { theme as AntDTheme } from 'antd';
import { AppProvider } from '@/app-context';

export interface LayoutProps {
  children: ReactElement | ReactElement[];
}

const BaseLayout = ({ children }: LayoutProps) => {
  const { defaultAlgorithm, darkAlgorithm } = AntDTheme;
  const { theme } = useTheme();
  // const isMobile = useMediaQuery(mediaSize.mobile);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme === 'dark' ? darkAlgorithm : defaultAlgorithm,
        components: {
          // Button: {
          //   colorPrimary: 'rgba(30, 136, 229, 1)',
          //   algorithm: true,
          // },
          Input: {
            colorBgContainerDisabled: 'transparent',
            algorithm: true,
          },
        },
      }}
    >
      <AppProvider>
        <App>{children}</App>
      </AppProvider>
    </ConfigProvider>
  );
};

export default BaseLayout;
