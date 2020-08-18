import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './styles.scss';
import {
  Col,
  Layout,
  Row,
  Input,
  Radio,
  Space,
  Button,
  Divider,
  Select,
} from 'antd';
import { Padding } from '../Authentication/Login/_commons/components';

const { Content } = Layout;
const { Option } = Select;

const Survey = props => {
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <Layout>
      <Space align={'center'} size={20}>
        <Button type="primary">Form Builder</Button>
        <Button>Responses</Button>
        <Button>Preview</Button>
      </Space>
      <Divider />
      <Padding top={20}>
        <Content>
          <Row>
            <Col span={18}>
              <div
                style={{
                  background: 'var(--white)',
                  borderRadius: 4,
                  border: '1px solid var(--primary-color)',
                  minHeight: 260,
                }}
              >
                <Padding
                  top={20}
                  bottom={20}
                  left={20}
                  right={20}
                  style={{ height: '100%' }}
                >
                  <Row style={{ height: '100%' }} justify="center" align="top">
                    <Col span={24}>
                      <Input placeholder="Type your question here..." />
                      <Select defaultValue="lucy" onChange={() => null}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled">Disabled</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                      </Select>
                    </Col>
                  </Row>
                </Padding>
              </div>
            </Col>
          </Row>
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
