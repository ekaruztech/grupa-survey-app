import { Col, Radio, Row, Typography } from 'antd';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { find } from 'lodash';
import {
  Align,
  Padding,
  Margin,
} from '../../../Authentication/_common/components';

const Question = props => {
  const { question: data, onAnswerSelected, answer, questionId } = props;
  const radioStyle = {
    display: 'block',
    height: '40px',
    lineHeight: '40px',
  };
  const onChange = e => {
    const answer = e.target.value;
    const answerValues = find(data?.options || [], o => o._id === answer);
    if (answerValues) {
      onAnswerSelected({ ...answerValues, questionId });
    }
    // console.log({ ...answerValues, questionId });
  };
  return (
    <Margin top={20}>
      <motion.div layout className={'sv-question-display-wrapper'}>
        <Align alignCenter style={{ height: '100%' }}>
          <Padding left={40} right={40} top={40} bottom={40}>
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
                  <Radio.Group onChange={onChange} value={answer}>
                    {data.options.map((option, index) => {
                      return (
                        <Padding bottom={20} key={index}>
                          <Radio style={radioStyle} value={option._id}>
                            {option.label}
                          </Radio>
                        </Padding>
                      );
                    })}
                  </Radio.Group>
                </Align>
              </Col>
            </Row>
          </Padding>
        </Align>
      </motion.div>
    </Margin>
  );
};

export default Question;
