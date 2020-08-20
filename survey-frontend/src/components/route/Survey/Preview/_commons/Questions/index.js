import { Button, Col, Row, Typography, Radio } from 'antd';
import { motion } from 'framer-motion';
import { map } from 'lodash';
import React, { useState } from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Align, Padding } from '../../../../Authentication/_common/components';

const Question = props => {
  const { question: data, offset, span, className } = props;
  const [answer, setAnswer] = useState('');
  const radioStyle = {
    display: 'block',
    height: '50px',
    lineHeight: '50px',
  };
  const onChange = e => {
    setAnswer(e.target.value);
  };
  return (
    <Col span={span || 16} offset={offset || 4}>
      <motion.div
        layout
        className={
          'sv-form-builder-question-display-wrapper ' + className || ''
        }
      >
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
                <Radio.Group onChange={onChange} value={answer}>
                  {data.options.map((option, index) => {
                    return (
                      <Padding bottom={20} key={index}>
                        <Radio style={radioStyle} value={option.value}>
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
      </motion.div>
    </Col>
  );
};

export default Question;
