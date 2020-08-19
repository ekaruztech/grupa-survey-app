import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './Home.scss';
import { Pagination, Col, Row } from 'antd';
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
        <h1>Hello</h1>
      </Row>
    </div>
  );
};

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
