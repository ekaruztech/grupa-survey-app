import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Col, Popconfirm, Spin } from 'antd';
import { motion } from 'framer-motion';
import {
  CloseCircleOutlined,
  CompassOutlined,
  LoadingOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { Align, Padding } from '../../../../Authentication/_common/components';
import { updateSurveyStatus } from '../../../../../../redux/actions';

const Index = props => {
  const {
    name,
    responseCount,
    updateSurveyStatus,
    surveyId,
    surveyActive,
    questions,
  } = props;
  const [statusLoading, setStatusLoading] = useState(false);
  const history = useHistory();
  return (
    <Col span={6}>
      <motion.div layout style={{ height: '100%' }}>
        <Align
          style={{ height: 250 }}
          alignCenter
          justifyCenter
          type={'column'}
        >
          <p>{name}</p>
          <p className={'text2'}>{responseCount} Responses</p>
          <p>{questions.length} Questions</p>
        </Align>
        <Align
          style={{
            height: 50,
            borderTop: '1px solid var(--border-default-color)',
          }}
          alignCenter
          justifyBetween={surveyActive}
          justifyCenter={!surveyActive}
        >
          <Button
            type={'link'}
            block={!surveyActive}
            onClick={() => history.push(`/surveys/${surveyId}`)}
            icon={<CompassOutlined />}
          >
            View
          </Button>

          {surveyActive && (
            <Popconfirm
              title="Are you sure？"
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              onConfirm={() => {
                setStatusLoading(true);
                updateSurveyStatus(
                  surveyId,
                  { status: false },
                  {},
                  'updateSurveyStatus',
                  () => setStatusLoading(false)
                );
              }}
            >
              <Button
                type={'text'}
                danger
                icon={!statusLoading && <CloseCircleOutlined />}
              >
                {statusLoading ? (
                  <Spin
                    indicator={
                      <Padding right={5}>
                        <LoadingOutlined style={{ color: 'red' }} spin />
                      </Padding>
                    }
                  />
                ) : (
                  'Close'
                )}
              </Button>
            </Popconfirm>
          )}
        </Align>
      </motion.div>
    </Col>
  );
};

export default Index;
