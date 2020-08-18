import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';
import { get } from 'lodash';
import '../styles.scss';
import { Layout, Row, Col, Typography, Button, Form } from 'antd';
import {
  LoadingOutlined,
  CheckCircleTwoTone,
  WarningFilled,
} from '@ant-design/icons';
import { Logo, Padding } from '../_common/components';
import { resetErrorState, verifyUserByEmail } from '../../../../redux/actions';

const { Content } = Layout;
const { Text, Title } = Typography;

const VerifyByLink = props => {
  const {
    verifyUserByEmail,
    loading,
    auth,
    push,
    verificationError,
    resetErrorState,
    match: {
      params: { email, hash },
    },
  } = props;
  useEffect(() => {
    const isUserVerified = !!auth.user && auth.user.accountVerified;
    const isLoggedIn =
      !!auth.sessionTimeExpiration &&
      auth.sessionTimeExpiration > new Date().getTime() / 1000;

    if (isLoggedIn && isUserVerified) {
      push('/');
    } else {
      if (!hash || !email) {
        push('/login');
      } else {
        verifyUserByEmail({ email, hash });
      }
    }
    return () => resetErrorState('verifyRegistrationEmail');
  }, []);

  const errorCode = get(verificationError, 'code');
  const errorMessage = get(verificationError, 'message');
  const isConflictResponse = !!errorCode && errorCode === 409;

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
              <>
                {' '}
                <Padding top={30}>
                  <span className={'logo'}>
                    <Logo />
                  </span>
                </Padding>
                {loading && (
                  <Padding top={30} bottom={20}>
                    <Title level={4} style={{ textAlign: 'center' }}>
                      {' '}
                      <LoadingOutlined />
                      &nbsp;Verifying
                    </Title>
                    <Text className={'verifying-text'}>
                      Please wait while we verify your email
                    </Text>
                  </Padding>
                )}
                {!loading && errorMessage && (
                  <Padding top={30} bottom={20} style={{ textAlign: 'center' }}>
                    <Title
                      level={4}
                      type="danger"
                      style={{ textAlign: 'center' }}
                    >
                      {' '}
                      <WarningFilled />
                      &nbsp; Error
                    </Title>
                    <Text className={'verifying-text'}>{errorMessage}</Text>
                    <Link
                      to="/login"
                      style={{ display: 'inline-block', marginTop: '5px' }}
                    >
                      <Button
                        type="primary"
                        htmlType="submit"
                        className={'login-btn btn-shadow'}
                      >
                        Proceed to login
                      </Button>
                    </Link>
                  </Padding>
                )}
                {!loading && !errorMessage && (
                  <Padding top={30} bottom={20} style={{ textAlign: 'center' }}>
                    <Title level={4} type="success">
                      <CheckCircleTwoTone twoToneColor="#52c41a" />
                      &nbsp; Success
                    </Title>
                    <Text className={'verifying-text'}>
                      Your email address has been verified.
                    </Text>
                    <Link
                      to="/login"
                      style={{ display: 'inline-block', marginTop: '5px' }}
                    >
                      <Button
                        type="primary"
                        htmlType="submit"
                        className={'login-btn btn-shadow'}
                      >
                        Proceed to login
                      </Button>
                    </Link>
                  </Padding>
                )}
              </>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

const mapDispatchToProps = {
  verifyUserByEmail,
  push,
  resetErrorState,
};
const mapStateToProps = state => {
  return {
    verificationError: state.ui.errors.verifyRegistrationEmail,
    loading: state.ui.loading.verifyRegistrationEmail,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyByLink);
