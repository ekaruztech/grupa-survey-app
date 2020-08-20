import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { pick } from 'lodash';
import '../styles.scss';
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Layout,
  Row,
  Typography,
} from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { FacebookIcon, GoogleIcon, Logo, Padding } from '../_common/components';
import SocialButton from '../../../_common/SocialButton';
import {
  doFacebookAuth,
  doGoogleAuth,
  register,
  setSocialAuthMode,
} from '../../../../redux/actions';

const { Content } = Layout;
const { Text } = Typography;

const emailRegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/;

const Register = props => {
  const {
    register,
    isRegistering,
    doFacebookAuth,
    doGoogleAuth,
    isDoingGoogleAuth,
    isDoingFacebookAuth,
    socialAuthMode,
    setSocialAuthMode,
  } = props;
  const FACEBOOK_APP_ID = process.env.REACT_APP_FACEBOOK_APP_ID;
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const verifyRedirectUrl = `${baseUrl}${process.env.REACT_APP_VERIFY_REDIRECT_PATH}`;

  const handleRegisterSubmit = values => {
    register(
      Object.assign({}, values, {
        verifyRedirectUrl,
      })
    );
  };

  const onSocialAuthResponse = ({ _profile, _token }, type = 'google') => {
    const payload = {
      socialId: _profile.id,
      accessToken: type === 'google' ? _token.idToken : _token.accessToken,
      ...pick(_profile, ['email', 'firstName', 'lastName']),
    };

    if (type === 'google') {
      doGoogleAuth(payload);
    } else if (type === 'facebook') {
      doFacebookAuth(payload);
    }
  };

  const onSocialAuthFailure = error => {
    setSocialAuthMode(false);
    console.log('Social authentication error ', error);
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
                <span className={'login-header-text'}>Create an account</span>
              </Padding>
            </div>
            <Padding top={30}>
              <Row style={{ width: 274 }}>
                <Form
                  labelCol={{ span: 4 }}
                  style={{ width: '100%' }}
                  name="login"
                  layout={'vertical'}
                  onFinish={handleRegisterSubmit}
                >
                  <Form.Item
                    name="email"
                    type="email"
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

                  <Form.Item
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your first name!',
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder={'First name'}
                      className={'login-input'}
                    />
                  </Form.Item>

                  <Form.Item
                    name="lastName"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your last name!',
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder={'Last name'}
                      className={'login-input'}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      loading={isRegistering}
                      type="primary"
                      htmlType="submit"
                      block
                      className={'login-btn btn-shadow'}
                    >
                      Sign Up
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
                <SocialButton
                  provider="facebook"
                  key="facebook"
                  onLoginSuccess={payload =>
                    onSocialAuthResponse(payload, 'facebook')
                  }
                  onLoginFailure={onSocialAuthFailure}
                  appId={FACEBOOK_APP_ID}
                  loading={isDoingFacebookAuth}
                >
                  <div className={'btn-icon-container'}>
                    <FacebookIcon />
                    <span>Sign in with Facebook</span>
                  </div>
                </SocialButton>
                <SocialButton
                  provider="google"
                  key="google"
                  appId={GOOGLE_CLIENT_ID}
                  onLoginSuccess={payload =>
                    onSocialAuthResponse(payload, 'google')
                  }
                  onLoginFailure={onSocialAuthFailure}
                  loading={isDoingGoogleAuth}
                >
                  <div className={'btn-icon-container'}>
                    <GoogleIcon />
                    <span>Sign in with Google</span>
                  </div>
                </SocialButton>
              </div>
            </Padding>
          </Col>

          <Padding top={20}>
            <div className={'more-btn-container'}>
              <Link to="#">Have an account?</Link>
              <Link to="/login">
                <Text strong>Sign in</Text>
              </Link>
            </div>
          </Padding>
        </Row>
      </Content>
    </Layout>
  );
};

const mapStateToProps = state => ({
  isRegistering: state.ui.loading.register,
  isDoingGoogleAuth: state.ui.loading.googleAuth,
  isDoingFacebookAuth: state.ui.loading.facebookAuth,
  socialAuthMode: state.auth.socialAuthMode,
});
const mapDispatchToProps = {
  register,
  doFacebookAuth,
  doGoogleAuth,
  setSocialAuthMode,
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
