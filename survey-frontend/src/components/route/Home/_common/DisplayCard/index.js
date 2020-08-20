import React from 'react';
import { Button, Col } from 'antd';
import { Align, Padding } from '../../../Authentication/_common/components';

const Index = ({ survey, history }) => {
  return (
    <Col span={6}>
      <Padding style={{ height: '100%' }}>
        <Align
          style={{
            height: 250,
            borderTop: '1px solid var(--border-default-color)',
            borderRight: '1px solid var(--border-default-color)',
            borderLeft: '1px solid var(--border-default-color)',
            borderBottom: 0,
          }}
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
            // borderTop: '1px solid var(--border-default-color)',
          }}
          alignCenter
          justifyBetween
        >
          {survey.active && (
            <Button
              block
              // type={'primary'}
              // ghost
              onClick={() => {
                history.push(`/surveys/${survey._id}/take-survey`);
              }}
              style={{
                height: 50,
                borderTopRightRadius: 0,
                borderTopLeftRadius: 0,
              }}
            >
              Take Survey
            </Button>
          )}
          {!survey.active && (
            <Button
              block
              type={'default'}
              style={{ height: 50, borderRadius: 0 }}
            >
              Closed Survey
            </Button>
          )}
        </Align>
      </Padding>
    </Col>
  );
};

export default Index;
