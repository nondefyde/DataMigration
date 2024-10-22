import { AppContext } from '@/app-context';
import { Select, Space } from 'antd';
import React, { useContext } from 'react';

const EnvironmentSelector = () => {
  const { setEnvironment } = useContext(AppContext);

  const environmentOptions = [
    { label: 'Development', value: 'development' },
    { label: 'Production', value: 'production' },
    { label: 'Project', value: 'project' },
  ];
  return (
    <Space size={10}>
      <span className="font-semibold">Select Environment</span>
      <Select
        options={environmentOptions}
        className="w-[200px]"
        defaultValue={'project'}
        onChange={setEnvironment}
      />
    </Space>
  );
};

export default EnvironmentSelector;
