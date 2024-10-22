'use client';
import React, { ReactElement } from 'react';

interface Props {
  children?: ReactElement[] | ReactElement;
}

const AuthLayout = ({ children }: Props) => {
  return <section className="w-full mt-24">{children}</section>;
};

export default AuthLayout;
