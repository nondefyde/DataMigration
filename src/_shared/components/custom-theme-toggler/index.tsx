'use client';
import { Tooltip } from 'antd';
import React from 'react';

interface CustomThemeTogglerProps {
  theme: string | undefined;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const CustomThemeToggler = ({ theme, setTheme }: CustomThemeTogglerProps) => {
  return (
    <div className="flex items-center gap-1">
      <Tooltip
        title={theme === 'light' ? 'Switch to Dark mode' : 'Switch to Light mode'}
        arrow={true}
        placement="bottom"
      >
        <div
          className={`flex items-center justify-center w-[36px] h-[36px] shadow-sm rounded-md bg-neutral-100`}
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'dark' && <i className="ri-sun-line text-[18px] text-neutral-500"></i>}
          {theme === 'light' && <i className="ri-moon-line text-[18px] text-neutral-500"></i>}
        </div>
      </Tooltip>
    </div>
  );
};

export default CustomThemeToggler;
