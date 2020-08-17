import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './styles.scss';
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
import { Logo, Padding, FacebookIcon, GoogleIcon } from './_commons/components';

const { Content } = Layout;
const { Link, Text } = Typography;

const Login = props => {
  const { auth } = props;

  useEffect(() => {
    return () => {};
  }, []);

  const onFinish = values => {
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
                  Sign into your Account
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
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your username!',
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder={'Email'}
                      className={'login-input'}
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      placeholder={'Password'}
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
                      Sign In
                    </Button>
                  </Form.Item>
                </Form>
              </Row>
            </Padding>

            <Divider />
            <Padding bottom={20}>
              <div
                className={'login-header'}
                style={{
                  width: 274,
                }}
              >
                <Button block className={'login-btn'}>
                  <div className={'btn-icon-container'}>
                    <FacebookIcon />
                    <span>Sign in with Facebook</span>
                  </div>
                </Button>
                <Padding top={10} style={{ width: '100%' }}>
                  <Button block className={'login-btn'}>
                    <div className={'btn-icon-container'}>
                      <GoogleIcon />
                      Sign in with Google
                    </div>
                  </Button>
                </Padding>
              </div>
            </Padding>
          </Col>

          <Padding top={20}>
            <div className={'more-btn-container'}>
              <Link href="#">Forgot password?</Link>
              <Link href="#">
                <Text strong>Create an Account</Text>
              </Link>
            </div>
          </Padding>
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

export default connect(mapStateToProps, dispatchToProps)(Login);
