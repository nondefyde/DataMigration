'use client';
import { Button, Card, Form, Input, Row } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useRouter } from 'next/navigation';
import React from 'react';

interface LoginProps {
  handleLogin: (values: Record<string, any>) => void;
  isLoadingLogin: boolean;
}

const Login = ({ handleLogin, isLoadingLogin }: LoginProps) => {
  const [form] = useForm();
  const { push } = useRouter();

  const onFinish = (values: Record<string, any>) => {
    handleLogin(values);
  };
  return (
    <div className="w-[500px] mx-auto">
      <Card className="border shadow-md border-neutral-200 p-5">
        <div className="font-semibold text-[22px] mb-6">Welcome back, sign in</div>
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={onFinish}
          name="account-setting-form"
          className="mt-5 account-setting-form"
        >
          <Row>
            <Form.Item
              name="email"
              rules={[{ required: true, type: 'email', message: 'Email is invalid' }]}
              label={<div className="mb-0 text-muted-foreground">Email</div>}
              className="w-full"
            >
              <Input placeholder="Enter your email" className="w-full" size="large" />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              name="password"
              className="w-full"
              label={<span className="mb-0 text-muted-foreground">Password</span>}
            >
              <Input.Password
                placeholder="Password"
                className="w-full"
                size="large"
                visibilityToggle
              />
            </Form.Item>
          </Row>
          <Row>
            <Button
              className="opacity-100 hover:opacity-70 mt-1.5 !bg-black text-white !h-12 font-semibold rounded-md"
              type="primary"
              disabled={false}
              block
              loading={isLoadingLogin}
              htmlType="submit"
              // size="large"
            >
              Continue
            </Button>
          </Row>
          <div className="">Forgot Password</div>
        </Form>
        <Row>
          {/* <Button
            className="opacity-100 mt-1.5 mb-10 text-muted-foreground h-12 font-semibold rounded-md border-neutral-200"
            type="primary"
            disabled={false}
            block
            loading={false}
            htmlType="submit"
            // size="large"
          >
            <Space className="flex items-center text-center justify-center" size={10}>
              <Image
                src={'/assets/svgs/google-icon.svg'}
                alt="google-icon"
                width={24}
                height={24}
              />
              <span>Sign in with Google</span>
            </Space>
          </Button> */}
          <div className="text-center mx-auto text-muted-foreground">
            By signing up, you agree to our <br />{' '}
            <span className="font-semibold text-blue cursor-pointer">
              Terms of Service and Privacy Policy
            </span>
          </div>
        </Row>
      </Card>
      <div className="text-center mt-10 text-muted-foreground">
        Don't have an account?{' '}
        <span
          className="font-semibold text-blue cursor-pointer"
          onClick={() => push('/auth/sign-up')}
        >
          Sign up
        </span>
      </div>
    </div>
  );
};

export default Login;
