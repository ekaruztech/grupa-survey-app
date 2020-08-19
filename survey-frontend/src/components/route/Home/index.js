import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './Home.scss';
import { Pagination , Col, Row } from 'antd';
import { fetchSurveys } from '../../../redux/actions';
import SurveyCard from '../surveyComponents/SurveyCard';


const Home = props => {
  const { auth, fetchSurveys, surveys, location, pagination } = props;

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

  return (
    <div className={'home'}>
      <Row>
        {surveys &&
          surveys.map(survey => {
            return (
              <SurveyCard
                name={survey.name}
                responseCount={survey.responseCount}
                key={survey._id}
                id={survey.id}
              />
            );
          })}
      </Row>
      {pagination && (
        <Pagination
          defaultCurrent={1}
          onChange={handlePagination}
          defaultPageSize={pagination.per_page}
          total={pagination.total_count}
        />
      )}
    </div>
  );
};

// <Row gutter={[16, 24]}>

// // </Row>
// <Row gutter={[16, 24]}>
//   <Col span={6}>
//     <div>Column</div>
//   </Col>
//   <Col span={6}>
//     <div>Column</div>
//   </Col>
//   <Col span={6}>
//     <div>Column</div>
//   </Col>
//   <Col span={6}>
//     <div>Column</div>
//   </Col>
// </Row>
const mapStateToProps = state => {
  return {
    auth: state.auth,
    surveys: state.surveys.byList,
    pagination: state.ui.pagination.fetchSurveys,
  };
};

const dispatchToProps = {
  fetchSurveys,
};

export default connect(mapStateToProps, dispatchToProps)(Home);
