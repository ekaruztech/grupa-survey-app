import React from 'react';
import { connect } from 'react-redux';
import '../styles.scss';
import { Layout, Row, Col, Form, Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Logo, Padding } from '../_common/components';
import { sendPasswordResetEmail } from '../../../../redux/actions';

const { Content } = Layout;

const emailRegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/;

const RequestEmail = props => {
  const { isSendingResetEmail, sendPasswordResetEmail } = props;

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const redirectUrl = `${baseUrl}${process.env.REACT_APP_UPDATE_PASSWORD_PATH}`;

  const handleEmailRequestSubmit = values =>
    sendPasswordResetEmail(
      Object.assign({}, values, {
        redirectUrl,
      })
    );

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
                  onFinish={handleEmailRequestSubmit}
                >
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your email!',
                      },
                      ({ getFieldValue }) => ({
                        validator(rule, value) {
                          if (!value || emailRegExp.test(value)) {
                            return Promise.resolve();
                          }
                          return Promise.reject('Please enter a valid email!');
                        },
                      }),
                    ]}
                  >
                    <Input
                      type="email"
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder={'Email'}
                      className={'login-input'}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      loading={isSendingResetEmail}
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
    isSendingResetEmail: state.ui.loading.sendPasswordResetEmail,
  };
};

const dispatchToProps = {
  sendPasswordResetEmail,
};

export default connect(mapStateToProps, dispatchToProps)(RequestEmail);
