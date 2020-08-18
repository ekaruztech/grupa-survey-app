import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import './Home.scss';
import { Button } from 'antd';
import { logout } from '../../../redux/actions';

const Home = props => {
  const { auth, logout } = props;

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div style={{ width: '400px', textAlign: 'center', margin: '50px auto' }}>
      <h2>Welcome home</h2>
      <Button onClick={logout} type="link">
        Logout
      </Button>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

const dispatchToProps = { logout };

export default connect(mapStateToProps, dispatchToProps)(Home);
