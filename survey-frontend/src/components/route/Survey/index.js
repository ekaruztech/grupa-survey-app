import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './styles.scss';
import { Layout, Space, Button, Divider } from 'antd';
import { Padding } from '../Authentication/_common/components';
import FormBuilder from './FormBuilder';

const { Content } = Layout;

const Survey = props => {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Layout className={'sv-survey-layout'} style={{ overflow: 'scroll' }}>
      <Space align={'center'} size={20}>
        <Button type="primary">Form Builder</Button>
        <Button>Responses</Button>
        <Button>Preview</Button>
      </Space>
      <Divider />
      <Padding top={20}>
        <Content>
          <FormBuilder />
        </Content>
      </Padding>
    </Layout>
  );
};
const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

const dispatchToProps = {};

export default connect(mapStateToProps, dispatchToProps)(Survey);
