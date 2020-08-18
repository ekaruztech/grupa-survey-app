import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './Home.scss';
import Card from '../../surveyComponents/Card';
import { Col, Row } from 'antd';

const Home = props => {
  const { auth } = props;
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className={'home'}>
      <Card />
      <Row gutter={[16, 24]}>
        <Col span={6}>
          <div>Column</div>
        </Col>
        <Col span={6}>
          <div>Column</div>
        </Col>
        <Col span={6}>
          <div>Column</div>
        </Col>
        <Col span={6}>
          <div>Column</div>
        </Col>
      </Row>
      <Row gutter={[16, 24]}>
        <Col span={6}>
          <div>Column</div>
        </Col>
        <Col span={6}>
          <div>Column</div>
        </Col>
        <Col span={6}>
          <div>Column</div>
        </Col>
        <Col span={6}>
          <div>Column</div>
        </Col>
      </Row>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

const dispatchToProps = {};

export default connect(mapStateToProps, dispatchToProps)(Home);
