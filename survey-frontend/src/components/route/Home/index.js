import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import './Home.scss';

const Home = props => {
  const { auth } = props;

  useEffect(() => {
    return () => {};
  }, []);

  return <div>Hello home</div>;
};
const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

const dispatchToProps = {};

export default connect(mapStateToProps, dispatchToProps)(Home);
