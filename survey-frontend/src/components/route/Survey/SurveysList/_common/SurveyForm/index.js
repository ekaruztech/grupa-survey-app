import React from 'react';
import { Button, Form, Input, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Padding } from '../../../../Authentication/_common/components';

const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};
const tailLayout = {
  wrapperCol: {
    span: 24,
  },
};

const Index = props => {
  const { handleSubmit, isCreatingSurvey } = props;
  const onFinish = values => {
    handleSubmit(values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Survey Title"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please enter survey title',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button
          type="primary"
          htmlType="submit"
          block
          style={{ height: 45 }}
          icon={
            isCreatingSurvey ? (
              <Spin
                indicator={
                  <Padding right={5}>
                    <LoadingOutlined style={{ color: 'var(--white)' }} spin />
                  </Padding>
                }
              />
            ) : null
          }
        >
          SAVE AND CONTINUE
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Index;
