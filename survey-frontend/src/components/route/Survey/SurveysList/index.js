import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Pagination, Row, Spin } from 'antd';
import { connect } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import { fetchSurveys } from '../../../../redux/actions';
import { Align, Padding } from '../../Authentication/_common/components';
import Index from './_common/SurveyDisplayCard';
import './styles.scss';

const SurveyList = props => {
  const { auth, fetchSurveys, surveys, isFetchingSurveys, pagination } = props;

  useEffect(() => {
    fetchSurveys();
    // return () => {};
  }, []);

  const handlePagination = pageNo => {
    fetchSurveys({
      page: pageNo,
      per_page: pagination.per_page || 10,
    });
  };

  return isFetchingSurveys ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Align
        alignCenter
        justifyCenter
        style={{ height: 'calc(100vh - 130px)' }}
      >
        <Spin
          indicator={
            <Padding right={5}>
              <Align type={'column'} alignCenter justifyCenter>
                <LoadingOutlined spin style={{ fontSize: 90 }} />
                <Padding top={20}>Loading</Padding>
              </Align>
            </Padding>
          }
        />
      </Align>
    </motion.div>
  ) : (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      className={'home'}
    >
      <Row gutter={[16, 24]}>
        {surveys &&
          surveys.map(survey => {
            return (
              <Index
                name={survey.name}
                responseCount={survey.responseCount}
                key={survey._id}
                id={survey.id}
              />
            );
          })}
      </Row>
      <Padding top={50}>
        {pagination && (
          <Pagination
            defaultCurrent={1}
            onChange={handlePagination}
            defaultPageSize={pagination.per_page}
            total={pagination.total_count}
          />
        )}
      </Padding>
    </motion.div>
  );
};
const mapStateToProps = state => {
  return {
    auth: state.auth,
    surveys: state.surveys.byList,
    pagination: state.ui.pagination.fetchSurveys,
    isFetchingSurveys: state.ui.loading.fetchSurveys,
  };
};

const dispatchToProps = {
  fetchSurveys,
};

export default connect(mapStateToProps, dispatchToProps)(SurveyList);
