import React from 'react';
import EnvironmentSelector from '../lib/environment-selector';
import { Space } from 'antd';
import CustomThemeToggler from '@/_shared/components/custom-theme-toggler';
import { useTheme } from 'next-themes';

const TypesHeader = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="border-b dark:border-b-neutral-600">
      <div className="container mx-auto py-4 px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">STEMULIx Data Migration</h1>
        <Space size={10}>
          <EnvironmentSelector />
          <CustomThemeToggler theme={theme} setTheme={setTheme} />
        </Space>
      </div>
    </header>
  );
};

export default TypesHeader;
