import React from 'react';
import { Button, Col } from 'antd';
import { Align, Padding } from '../../../Authentication/_common/components';

const Index = ({ survey }) => {
  return (
    <Col span={4}>
      <Padding style={{ height: '100%' }}>
        <Align
          style={{ height: 250 }}
          alignCenter
          justifyCenter
          type={'column'}
        >
          <h1 className="text0">{survey.name}</h1>
          {survey.description && (
            <h4 className="text1">New website feedback survey</h4>
          )}
          <p className="text2">{survey.questions.length} Questions</p>
        </Align>
        <Align
          style={{
            height: 50,
            borderTop: '1px solid var(--border-default-color)',
          }}
          alignCenter
          justifyBetween
        >
          <Button
            block
            type={'primary'}
            onClick={false}
            style={{ height: 50, borderRadius: 0 }}
          >
            Take Survey
          </Button>
        </Align>
      </Padding>
    </Col>
  );
};

export default Index;
