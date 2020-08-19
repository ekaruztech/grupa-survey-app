import React, { useState } from 'react';
import { Form, Button, Checkbox, Row, Col } from 'antd';
import './users.scss';
import { ArrowLeftOutlined } from '@ant-design/icons';

const formTailLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
    offset: 4,
  },
};

const Users = () => {
  const [checkOption, setcheckOption] = useState(false);
  const [checkOption2, setcheckOption2] = useState(false);
  const [checkOption3, setcheckOption3] = useState(false);
  const [checkOption4, setcheckOption4] = useState(false);
  const [checkOption5, setcheckOption5] = useState(false);
  const [size, setSize] = useState('large');
  const onCheckboxChange1 = e => {
    setcheckOption(e.target.checked);
  };

  const onCheckboxChange2 = e => {
    setcheckOption2(e.target.checked);
  };

  const onCheckboxChange3 = e => {
    setcheckOption3(e.target.checked);
  };

  const onCheckboxChange4 = e => {
    setcheckOption4(e.target.checked);
  };

  const onCheckboxChange5 = e => {
    setcheckOption5(e.target.checked);
  };
  return (
    <Row justify={'center'} align={'middle'} className="users-layout">
      <Col>
        <Form
          initialValues={{
            remember: true,
          }}
          onFinish={false}
          onFinishFailed={false}
        >
          <div className="bg-white p-4">
            <Button
              className="prevPosition"
              type="primary"
              icon={<ArrowLeftOutlined />}
              onClick={false}
              size={size}
            />
            <h1 className="users-h1">
              How many players won gold medal at the 2020 Olympics?
            </h1>
            <Form.Item className="ant-form-item-hover">
              <Checkbox checked={checkOption} onChange={onCheckboxChange1}>
                Option 1
              </Checkbox>
            </Form.Item>
            <Form.Item className="ant-form-item-hover">
              <Checkbox checked={checkOption2} onChange={onCheckboxChange2}>
                Option 2
              </Checkbox>
            </Form.Item>
            <Form.Item className="ant-form-item-hover">
              <Checkbox checked={checkOption3} onChange={onCheckboxChange3}>
                Option 3
              </Checkbox>
            </Form.Item>
            <Form.Item className="ant-form-item-hover">
              <Checkbox checked={checkOption4} onChange={onCheckboxChange4}>
                Option 4
              </Checkbox>
            </Form.Item>
            <Form.Item className="ant-form-item-hover">
              <Checkbox checked={checkOption5} onChange={onCheckboxChange5}>
                Option 5
              </Checkbox>
            </Form.Item>
          </div>

          <div>
            <Form.Item>
              <Button
                type="primary"
                size={size}
                htmlType="button"
                className="nextbtn"
                style={{
                  padding: '0 50px',
                  height: '50px',
                }}
                onClick={false}
              >
                Next
              </Button>
            </Form.Item>
          </div>
          {/* <div className="align-center mt-2">
            <Form.Item>
              <Button size={size} type="primary">
                SUBMIT SURVEY
              </Button>
            </Form.Item>
          </div> */}
        </Form>
      </Col>
    </Row>
  );
};

export default Users;
