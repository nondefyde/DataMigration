import { FC, ReactNode } from 'react';
import { Rings } from 'react-preloader-icon';
import { LoaderProps } from 'react-preloader-icon/Preloader';
import { AppLoader } from '../app-loader';
import { motion } from 'framer-motion';
import styled from 'styled-components';

interface WithLoaderProps {
  loading: boolean | undefined;
  mobileResponsive: boolean;
  use?: FC<LoaderProps>;
  children: ReactNode | ReactNode[];
  theme?: string;
  isLogout?: boolean;
}

const variants = (loading: boolean | undefined) => ({
  hidden: { opacity: 0 },
  enter: { opacity: loading ? 0.1 : 1 },
  exit: { opacity: 0 },
});

export const WithLoaderRender = (props: WithLoaderProps) => {
  const { loading, mobileResponsive, children, use, theme, isLogout } = props;
  return (
    <>
      {loading && (
        <div className="min-h-screen w-full absolute top-0 flex items-center justify-center z-10">
          <AppLoader
            use={use || Rings}
            theme={theme}
            // style={{ left: mobileResponsive ? '38vw' : '38vw' }}
            isLogout={isLogout}
          />
        </div>
      )}
      <StyledAppContent
        $mobileResponsive={mobileResponsive}
        $loading={loading}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={mobileResponsive ? {} : variants(loading)}
        // transition={{ type: 'spring', bounce: 0.2 }}
        transition={{ type: 'tween', duration: 1, ease: 'easeInOut' }}
      >
        {children}
      </StyledAppContent>
    </>
  );
};

const StyledAppContent = styled(motion.div)<{
  $mobileResponsive: boolean;
  $loading: boolean | undefined;
}>`
  width: 100%;
  overflow: hidden auto;
  min-height: 100%;
  pointer-events: ${(props) => props.$loading && 'none'};
`;
