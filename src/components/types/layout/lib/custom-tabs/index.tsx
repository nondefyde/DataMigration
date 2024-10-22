import { mediaSize, useMediaQuery } from '@/_shared/components/responsiveness';
import { capitalize, startCase } from 'lodash';
import { usePathname, useRouter } from 'next/navigation';
import React, { ReactElement } from 'react';

interface TabItemType {
  label: ReactElement | string;
  path: string;
}

interface CustomTabProps {
  tabItems: TabItemType[];
}

const CustomTabs = ({ tabItems }: CustomTabProps) => {
  const { push } = useRouter();
  const pathName = usePathname();
  const pathUrl = pathName?.split('/');
  const currentPage = pathUrl?.[1];
  const isMobile = useMediaQuery(mediaSize.mobile);

  return (
    <div
      className={`px-1 py-1 inline-flex bg-neutral-100 dark:bg-neutral-700 backdrop-blur rounded-lg my-4`}
    >
      {tabItems?.map(({ label, path }, index) => (
        <div
          onClick={() => push(`/${path}`)}
          key={`tab_${index}_${path}`}
          className={`text-base ${
            path === currentPage
              ? 'text-black dark:text-white font-medium bg-background shadow-sm'
              : 'text-muted-foreground'
          } py-1 rounded-lg px-3 cursor-pointer`}
        >
          {typeof label === 'string' ? (
            <span className={`${isMobile ? 'text-[14px]' : 'text-[16px]'}`}>
              {startCase(capitalize(label))}
            </span>
          ) : (
            label
          )}
        </div>
      ))}
    </div>
  );
};

export default CustomTabs;
