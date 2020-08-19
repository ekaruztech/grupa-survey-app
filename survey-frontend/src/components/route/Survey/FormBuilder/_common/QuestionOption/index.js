import { Button, Col, Input, Row, Tooltip } from 'antd';
import { motion } from 'framer-motion';
import React from 'react';
import { CheckCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Padding } from '../../../../Authentication/_common/components';

const QuestionOption = props => {
  const { updateOption, optionKey, value, removeOption } = props;
  const onChange = e => {
    updateOption({ key: optionKey, value: e.target.value });
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
                          onClick={() => removeOption(optionKey)}
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
export default QuestionOption;
