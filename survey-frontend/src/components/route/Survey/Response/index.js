import { motion } from 'framer-motion';
import { Button, Empty, PageHeader, Row, Spin } from 'antd';
import React, { useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { Align, Margin } from '../../Authentication/_common/components';
import { getSurveyResponse } from '../../../../redux/actions';
import ResponseCard from './_common/ResponseCard';

const Response = props => {
  const {
    getSurveyResponse,
    surveyResponse,
    isGettingSurveyResponse,
    survey,
    // surveyId
  } = props;
  const surveyId = '5f3d73b0045cc2002c03c48b';

  useEffect(() => {
    getSurveyResponse(surveyId);
  }, []);
  return (
    <>
      {isGettingSurveyResponse && (
        <Margin top={40} bottom={40}>
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Align
              alignCenter
              justifyCenter
              style={{ minHeight: 500, width: '100%' }}
            >
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 90 }} spin />}
              />
            </Align>
          </motion.div>
        </Margin>
      )}
      {!isGettingSurveyResponse && isEmpty(surveyResponse) && (
        <Align
          alignCenter
          justifyCenter
          style={{ width: '100%', minHeight: 500 }}
        >
          <Empty
            description={<span>This survey currently has no response</span>}
          />
        </Align>
      )}
      {!isGettingSurveyResponse && !isEmpty(surveyResponse) && (
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Margin bottom={30}>
            <PageHeader
              className="sv-survey-response-page-header"
              title={`${survey?.responseCount || 0} responses`}
            />
          </Margin>
          <Row gutter={[16, 24]}>
            {(survey?.questions || [])?.map((question, index) => {
              return (
                <ResponseCard
                  key={question?._id}
                  survey={survey}
                  question={question}
                  surveyResponse={surveyResponse}
                />
              );
            })}
          </Row>
        </motion.div>
      )}
    </>
  );
};
const stateToProps = state => ({
  surveyResponse: state.surveys.surveyResponse,
  isGettingSurveyResponse: state.ui.loading.getSurveyResponse,
});

const dispatchToProps = {
  getSurveyResponse,
};

export default connect(stateToProps, dispatchToProps)(Response);
