import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import { Button, Empty, Pagination, Row, Space, Spin } from 'antd';
import { motion } from 'framer-motion';
import { fetchSurveys } from '../../../redux/actions';
import { Align, Padding } from '../Authentication/_common/components';
import DisplayCard from './_common/DisplayCard/index';
import './home.scss';

const HomeSurveyList = props => {
  const {
    fetchSurveys,
    isFetchingSurveys,
    surveys,
    pagination,
    history,
  } = props;

  const [size] = useState(10);

  const [active, setActive] = useState(true);

  useEffect(() => {
    getSurveys();
  }, []);

  const handlePagination = pageNo => {
    getSurveys(
      {
        page: pageNo,
        per_page: pagination.per_page || 8,
      },
      active
    );
  };

  const getSurveys = (params = { page: 1, per_page: 8 }, active = true) => {
    fetchSurveys({
      ...params,
      active,
    });
  };

  const updateList = active => {
    setActive(active);
    getSurveys({ page: 1, per_page: 8 }, active);
  };

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      className={'home'}
    >
      <Row justify={'center'} align={'middle'} top={30} className="row-header">
        <Space size={size}>
          <Button
            type={active ? `primary` : 'default'}
            onClick={() => updateList(!active)}
            style={{
              marginBottom: 20,
            }}
          >
            Active Surveys
          </Button>
          <Button
            type={!active ? `primary` : 'default'}
            onClick={() => updateList(!active)}
            style={{
              marginBottom: 20,
            }}
          >
            Closed
          </Button>
        </Space>
      </Row>
      {isFetchingSurveys ? (
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          className={'home'}
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
        <>
          <Row gutter={[16, 24]}>
            {surveys?.length < 1 && (
              <Align
                alignCenter
                justifyCenter
                style={{ width: '100%', minHeight: 500, height: '100%' }}
              >
                <Empty
                  description={
                    <span>You currently have no surveys, create one!</span>
                  }
                />
              </Align>
            )}
            {(surveys?.length || 0) > 0 &&
              surveys.map(survey => {
                return (
                  <DisplayCard
                    key={survey._id}
                    survey={survey}
                    history={history}
                  />
                );
              })}
          </Row>
          <Padding top={30}>
            {pagination && (
              <Pagination
                defaultCurrent={1}
                current={pagination.current || 1}
                onChange={handlePagination}
                defaultPageSize={pagination.per_page}
                total={pagination.total_count}
                showTotal={(total, range) => (
                  <Padding
                    right={50}
                  >{`${range[0]}-${range[1]} of ${total} items`}</Padding>
                )}
                itemRender={function(current, type, originalElement) {
                  if (type === 'prev') {
                    return <a>Previous</a>;
                  }
                  if (type === 'next') {
                    return <a>Next</a>;
                  }
                  return originalElement;
                }}
              />
            )}
          </Padding>
        </>
      )}
    </motion.div>
  );
};

const mapStateToProps = state => {
  return {
    surveys: state.surveys.byList,
    isFetchingSurveys: state.ui.loading.fetchSurveys,
    pagination: state.ui.pagination.fetchSurveys,
  };
};

const dispatchToProps = {
  fetchSurveys,
};

export default connect(mapStateToProps, dispatchToProps)(HomeSurveyList);
