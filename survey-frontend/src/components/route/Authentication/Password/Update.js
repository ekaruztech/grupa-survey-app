import React from 'react';
import { connect } from 'react-redux';
import '../styles.scss';
import { Layout, Row, Col, Form, Input, Button } from 'antd';
import { LockOutlined, CodeOutlined } from '@ant-design/icons';
import { Logo, Padding } from '../_common/components';
import { resetPassword } from '../../../../redux/actions';

const { Content } = Layout;

const ResetPassword = props => {
  const { isResettingPassword, resetPassword, user } = props;

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const redirectUrl = `${baseUrl}${process.env.REACT_APP_UPDATE_PASSWORD_PATH}`;

  const handleSubmit = values => {
    resetPassword(
      Object.assign({}, values, {
        redirectUrl,
        email: user.email,
      })
    );
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
            <div className={'login-header'} style={{ textAlign: 'center' }}>
              <Padding top={20}>
                <span className={'logo'}>
                  <Logo />
                </span>
              </Padding>
              <Padding top={10}>
                <span className={'login-header-text'}>
                  Provide your email for a reset link.
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
                  onFinish={handleSubmit}
                >
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password',
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      placeholder={'Enter password'}
                      className={'login-input'}
                    />
                  </Form.Item>

                  <Form.Item
                    name="passwordConfirm"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password confirmation!',
                      },
                      ({ getFieldValue }) => ({
                        validator(rule, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            'The two passwords do not match!'
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      placeholder={'Confirm password'}
                      className={'login-input'}
                    />
                  </Form.Item>
                  <Padding top={5} bottom={5} style={{ textAlign: 'center' }}>
                    <span className={'login-header-text'}>
                      Enter code sent to your mail address.
                    </span>
                  </Padding>
                  <Form.Item
                    name="passwordResetCode"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter password reset code',
                      },
                    ]}
                  >
                    <Input
                      prefix={<CodeOutlined className="site-form-item-icon" />}
                      placeholder={'Reset code'}
                      className={'login-input'}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      loading={isResettingPassword}
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
    isResettingPassword: state.ui.loading.resetPassword,
    user: state.auth.user,
  };
};

const dispatchToProps = {
  resetPassword,
};

export default connect(mapStateToProps, dispatchToProps)(ResetPassword);
