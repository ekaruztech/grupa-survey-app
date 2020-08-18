import React, { useEffect } from 'react';
import { connect } from 'react-redux';
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
import { UserOutlined } from '@ant-design/icons';
import { Logo, Padding } from '../_common/components';
import {
  resendRegVerificationCode,
  verifyRegistrationCode,
} from '../../../../redux/actions';

const { Content } = Layout;
const { Text } = Typography;

const VerifyByCode = props => {
  const {
    user,
    isVerifying,
    isResendingCode,
    verifyRegistrationCode,
    resendRegVerificationCode,
  } = props;

  useEffect(() => {
    return () => {};
  }, []);

  const handleSubmit = values => verifyRegistrationCode(values);

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const verifyRedirectUrl = `${baseUrl}${process.env.REACT_APP_VERIFY_REDIRECT_PATH}`;

  const handleResendButtonClick = () =>
    resendRegVerificationCode({ verifyRedirectUrl });

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
                  Verification details sent to <b>{user.email}</b>
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
                  onFinish={handleSubmit}
                >
                  <Form.Item
                    name="verificationCode"
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
                      loading={isVerifying}
                      type="primary"
                      htmlType="submit"
                      block
                      className={'login-btn btn-shadow'}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
                <div style={{ textAlign: 'center', width: '100%' }}>
                  Click{' '}
                  <Button
                    loading={isResendingCode}
                    onClick={handleResendButtonClick}
                    style={{ padding: 0 }}
                    type="link"
                  >
                    here
                  </Button>{' '}
                  to resend
                </div>
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
    user: state.auth.user,
    isVerifying: state.ui.loading.verifyRegistrationCode,
    isResendingCode: state.ui.loading.resendRegVerificationCode,
  };
};

const dispatchToProps = {
  verifyRegistrationCode,
  resendRegVerificationCode,
};

export default connect(mapStateToProps, dispatchToProps)(VerifyByCode);
