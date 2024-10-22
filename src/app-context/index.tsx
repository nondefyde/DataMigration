'use client';
// import { AuthDataType } from '@grc/_shared/namespace/auth';
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

type Environment = 'production' | 'project' | 'development';

type AppProviderPropType = {
  children: ReactNode;
};

interface AppContextPropType {
  toggleSider: boolean;
  // authData: AuthDataType | null;
  environment: Environment;
  setEnvironment: (env: Environment) => void;
  questData: Record<string, any>[];
  setQuestData: Dispatch<SetStateAction<Record<string, any>[]>>;
}

export const AppContext = createContext<AppContextPropType>({
  toggleSider: false,
  // authData: null,
  environment: 'development',
  setEnvironment: () => {},
  questData: [],
  setQuestData: () => {}
});

export const AppProvider = (props: AppProviderPropType) => {
  const { children } = props;
  const [toggleSider, setToggleSider] = useState(false);
  const [environment, setEnvironment] = useState<Environment>('project');
    const [questData, setQuestData] = useState<Record<string, any>[]>([]);


  const values: any = {
    toggleSider,
    setToggleSider,
    environment,
    setEnvironment,
    questData,
    setQuestData
    // handleLogOut,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
