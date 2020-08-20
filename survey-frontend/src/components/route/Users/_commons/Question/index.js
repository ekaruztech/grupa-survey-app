import { Col, Radio, Row, Typography } from 'antd';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import {
  Align,
  Padding,
  Margin,
} from '../../../Authentication/_common/components';

const Question = props => {
  const { question: data } = props;
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
    <Margin top={40}>
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
        </Align>
      </motion.div>
    </Margin>
  );
};

export default Question;
