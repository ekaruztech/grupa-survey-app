import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

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

const SurveyForm = ({ handleSubmit }) => {
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
            message: 'Please enter label field',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          SAVE AND CONTINUE
        </Button>
      </Form.Item>
      <Form.Item>
        <div>Cancel and Return</div>
      </Form.Item>
    </Form>
  );
};

export default SurveyForm;
