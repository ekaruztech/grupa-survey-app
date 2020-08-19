import { Button, Col, Divider, Row, Tooltip, Typography } from 'antd';
import { motion } from 'framer-motion';
import { map } from 'lodash';
import React from 'react';
import { CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { Align, Padding } from '../../../../Authentication/_common/components';

const QuestionDisplay = props => {
  const {
    question: data,
    setHideQuestionCreator,
    removeQuestion,
    setInitialFormState,
  } = props;
  return (
    <Col span={16}>
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
                <Typography.Title level={3}>{data.question}</Typography.Title>
                {data?.description && (
                  <Padding top={5} bottom={20}>
                    <Typography.Paragraph>
                      {data?.description}
                    </Typography.Paragraph>
                  </Padding>
                )}
              </Align>
              <Align type={'column'}>
                {data.answers.map((value, index) => {
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
                        <Typography.Text>{value}</Typography.Text>
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
                          type="text"
                          onClick={() => removeQuestion(data.id)}
                          icon={<DeleteOutlined />}
                        />
                      </Tooltip>
                    </Align>
                    <Divider type={'vertical'} height={30} />
                    <Align alignCenter>
                      <Button
                        onClick={() => {
                          setInitialFormState(() => ({
                            id: data.id,
                            question: data.question,
                            options: map(data.answers, (value, index) => ({
                              key: index,
                              value,
                            })),
                            description: data.description,
                          }));
                          setHideQuestionCreator(false);
                          removeQuestion(data.id);
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
  );
};

export default QuestionDisplay;
