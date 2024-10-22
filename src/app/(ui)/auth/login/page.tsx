'use client';
import Login from '@/components/auth/login';
import { useRouter } from 'next/navigation';
import React from 'react';

const LoginPage = () => {
  const router = useRouter();

  const handleLogin = (values: Record<string, any>) => {
    console.log(values);

    router.push('/quest');
  };

  return <Login handleLogin={handleLogin} isLoadingLogin={false} />;
};

export default LoginPage;
