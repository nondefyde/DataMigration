// import { Preloader, TailSpin } from 'react-preloader-icon';
import React, { FC } from 'react';
import { LoaderProps } from 'react-preloader-icon/Preloader';
import { dotPulse } from 'ldrs';
import { motion } from 'framer-motion';
import { lineSpinner } from 'ldrs';
import { useTheme } from 'next-themes';
lineSpinner.register();
dotPulse.register();

export const AppLoader = (props: {
  size?: number;
  style?: Record<string, any>;
  use?: FC<LoaderProps>;
  theme?: string;
  isLogout?: boolean;
}) => {
  const { isLogout = false } = props;
  const { theme } = useTheme();
  return (
    // <Preloader
    //   use={use || TailSpin}
    //   size={size}
    //   strokeWidth={8}
    //   strokeColor={'#F0AD4E'}
    //   style={{
    //     position: 'absolute',
    //     top: '30vh',
    //     left: '50vw',
    //     zIndex: 10,
    //     ...style,
    //   }}
    // />
    <motion.div
      style={{ backgroundColor: 'transparent' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
      className="w-full h-full flex items-center justify-center"
    >
      <span className="flex flex-col items-center gap-3">
        {isLogout && <span>Logging out...</span>}(
        <l-line-spinner
          size={30}
          stroke="3"
          speed="1"
          color={theme === 'light' ? 'black' : '#ffffff'}
        ></l-line-spinner>
        )
      </span>
    </motion.div>
  );
};
