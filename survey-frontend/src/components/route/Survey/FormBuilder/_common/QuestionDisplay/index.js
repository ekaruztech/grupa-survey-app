import { Button, Col, Divider, Row, Spin, Tooltip, Typography } from 'antd';
import { motion } from 'framer-motion';
import { map } from 'lodash';
import React from 'react';
import {
  CheckCircleOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { Align, Padding } from '../../../../Authentication/_common/components';

const QuestionDisplay = props => {
  const {
    question: data,
    setHideQuestionCreator,
    removeQuestion,
    setInitialFormState,
    isDeletingQuestion,
    hideDisplay,
  } = props;

  return !hideDisplay ? (
    <Col span={16} offset={4}>
      <motion.div layout className={'sv-form-builder-question-display-wrapper'}>
        <Padding
          top={30}
          bottom={10}
          left={30}
          right={30}
          style={{ height: '100%' }}
        >
          <Row>
            <Col span={24}>
              <Align type={'column'}>
                <Typography.Title level={3}>
                  {data?.label || 'Untitled question'}
                </Typography.Title>
                {data?.description && (
                  <Padding top={5} bottom={20}>
                    <Typography.Paragraph>
                      {data?.description}
                    </Typography.Paragraph>
                  </Padding>
                )}
              </Align>
              <Align type={'column'}>
                {data.options.map((value, index) => {
                  return (
                    <Padding bottom={20} key={index}>
                      <Align type={'row'} alignCenter>
                        <Padding right={10}>
                          <CheckCircleOutlined
                            style={{
                              color: 'var(--primary-color)',
                            }}
                          />
                        </Padding>
                        <Typography.Text>{value?.label}</Typography.Text>
                      </Align>
                    </Padding>
                  );
                })}
              </Align>
            </Col>
            <Divider style={{ margin: 10 }} />

            <Col span={24}>
              <motion.div layout>
                <Align alignCenter justifyEnd>
                  <Align alignCenter>
                    <Align alignCenter>
                      <Tooltip title={'Delete'}>
                        <Button
                          shape={'circle'}
                          type="danger"
                          ghost
                          disabled={isDeletingQuestion}
                          style={{ border: 0 }}
                          onClick={() => removeQuestion(data._id)}
                          icon={<DeleteOutlined />}
                        />
                      </Tooltip>
                    </Align>
                    <Divider type={'vertical'} height={30} />
                    <Align alignCenter>
                      <Button
                        onClick={() => {
                          setInitialFormState(() => ({
                            _id: data._id,
                            question: data.label,
                            options: map(data.options, (option, index) => ({
                              key: option._id,
                              value: option.label,
                            })),
                            description: data.description,
                          }));
                          setHideQuestionCreator(false);
                        }}
                      >
                        Edit
                      </Button>
                    </Align>
                  </Align>
                </Align>
              </motion.div>
            </Col>
          </Row>
        </Padding>
      </motion.div>
    </Col>
  ) : null;
};

export default QuestionDisplay;
