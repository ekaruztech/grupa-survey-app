import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles.scss';
import {
  Layout,
  Row,
  Col,
  Divider,
  Form,
  Input,
  Typography,
  Button,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Logo, Padding, FacebookIcon, GoogleIcon } from '../_common/components';

const { Content } = Layout;
const { Text } = Typography;

const Verify = props => {
  const { auth } = props;

  useEffect(() => {
    return () => {};
  }, []);

  const onFinish = values => {
    console.log('values ', values);
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout>
      <Content className={'content'}>
        <Row
          gutter={[16, 16]}
          align={'middle'}
          justify={'center'}
          className={'row-container'}
        >
          <Col className={'col-container'}>
            <div className={'login-header'}>
              <Padding top={20}>
                <span className={'logo'}>
                  <Logo />
                </span>
              </Padding>
              <Padding top={10}>
                <span className={'login-header-text'}>
                  Verify your Account's email
                </span>
              </Padding>
            </div>
            <Padding top={30}>
              <Row style={{ width: 274 }}>
                <Form
                  labelCol={{ span: 4 }}
                  style={{ width: '100%' }}
                  name="login"
                  layout={'vertical'}
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    name="verification_code"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your verification code!',
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder={'Verification code'}
                      className={'login-input'}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      className={'login-btn btn-shadow'}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Row>
            </Padding>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

const dispatchToProps = {};

export default connect(mapStateToProps, dispatchToProps)(Verify);
