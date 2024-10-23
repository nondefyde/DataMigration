'use client';
import { Button, Card, Form, Input, Row } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React from 'react';

interface LoginProps {
  handleLogin: (values: Record<string, any>) => void;
  isLoadingLogin: boolean;
}

const Login = ({ handleLogin, isLoadingLogin }: LoginProps) => {
  const [form] = useForm();

  const onFinish = (values: Record<string, any>) => {
    handleLogin(values);
  };
  return (
    <div className="w-[500px] mx-auto">
      <Card className="border shadow-md border-neutral-200 p-5">
        <h1 className="font-semibold text-[32px] mb-1">Data Migration</h1>
        <div className="font-semibold text-[18px] mb-6">Hope you know what you want to do here</div>
        <h3 className="font-semibold text-[22px] mb-6">Enter Password to Log In</h3>
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
              htmlType="submit">
              Continue
            </Button>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
