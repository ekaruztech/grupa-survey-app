import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  CheckCircleOutlined,
  CloseOutlined,
  CopyOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
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
  Switch,
  Typography,
  Tooltip,
} from 'antd';
import { motion } from 'framer-motion';
import { Padding, Align } from '../Authentication/_common/components';

const { Content } = Layout;

const QuestionOption = props => {
  const { updateOption, key, value, removeOption } = props;
  const onChange = e => {
    updateOption({ key, value: e.target.value });
  };
  return (
    <Col span={24}>
      <motion.div layout>
        <Padding top={20} bottom={15}>
          <Row>
            <Col span={24}>
              <Tooltip title={'Click to edit option'} placement={'topLeft'}>
                <Input
                  prefix={
                    <Padding right={10}>
                      <CheckCircleOutlined />
                    </Padding>
                  }
                  className={'sv-survey-option-input'}
                  placeholder="Option"
                  bordered={false}
                  onChange={onChange}
                  value={value}
                  suffix={
                    <Padding left={5}>
                      <Tooltip title={'Remove option'}>
                        <Button
                          style={{ border: 0 }}
                          shape={'circle'}
                          onClick={() => removeOption(key)}
                          icon={
                            <CloseOutlined
                              style={{
                                color: 'var(--text-color)',
                              }}
                            />
                          }
                        />
                      </Tooltip>
                    </Padding>
                  }
                />
              </Tooltip>
            </Col>
          </Row>
        </Padding>
      </motion.div>
    </Col>
  );
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'update':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
};
const Survey = props => {
  const [showDescription, setShowDescription] = useState(false);
  const [state, dispatch] = useState();
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <Layout className={'sv-survey-layout'}>
      <Space align={'center'} size={20}>
        <Button type="primary">Form Builder</Button>
        <Button>Responses</Button>
        <Button>Preview</Button>
      </Space>
      <Divider />
      <Padding top={20}>
        <Content>
          <Row>
            <Col span={16}>
              <div
                style={{
                  background: 'var(--white)',
                  borderRadius: 4,
                  border: '1px solid var(--primary-color)',
                  minHeight: 260,
                  boxShadow: '3px 3px 3px #3E82FF26',
                }}
              >
                <Padding
                  top={30}
                  bottom={10}
                  left={30}
                  right={30}
                  style={{ height: '100%' }}
                >
                  <Row
                    style={{ height: '100%' }}
                    justify="center"
                    align="top"
                    gutter={[10]}
                  >
                    <Col span={24}>
                      <Input
                        placeholder="Type your question here..."
                        style={{ height: 45 }}
                      />
                    </Col>
                    {showDescription && (
                      <Col span={24}>
                        <Padding top={20} bottom={20}>
                          <motion.div layout>
                            <Input.TextArea
                              placeholder="Description"
                              autoSize={{ minRows: 3, maxRows: 6 }}
                            />
                          </motion.div>
                        </Padding>
                      </Col>
                    )}

                    <Col span={24}>
                      <motion.div layout>
                        <Padding top={10} bottom={15}>
                          <Row>
                            <Col span={24}>
                              <Align type={'row'} alignCenter>
                                <Padding>
                                  <PlusOutlined
                                    style={{ color: 'var(--primary-color)' }}
                                  />
                                </Padding>
                                <Button type="link">Add option</Button>
                              </Align>
                            </Col>
                          </Row>
                        </Padding>
                      </motion.div>
                    </Col>

                    <Divider style={{ margin: 10 }} />

                    <Col span={24}>
                      <motion.div layout>
                        <Align alignCenter justifyBetween>
                          <Align alignCenter>
                            <Padding right={10}>
                              <Typography.Text>Description</Typography.Text>
                            </Padding>
                            <Switch
                              checked={showDescription}
                              size={'small'}
                              onChange={() => setShowDescription(prev => !prev)}
                            />
                          </Align>
                          <Align alignCenter>
                            <Align alignCenter>
                              <Button
                                shape={'circle'}
                                type="text"
                                icon={<CopyOutlined />}
                              />
                              <Button
                                shape={'circle'}
                                type="text"
                                icon={<DeleteOutlined />}
                              />
                            </Align>
                            <Divider type={'vertical'} height={30} />
                            <Align alignCenter>
                              <Padding right={10}>
                                <Typography.Text>Required</Typography.Text>
                              </Padding>
                              <Switch
                                checked={showDescription}
                                size={'small'}
                                onChange={() =>
                                  setShowDescription(prev => !prev)
                                }
                              />
                            </Align>
                          </Align>
                        </Align>
                      </motion.div>
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
