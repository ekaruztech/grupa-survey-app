import React, { Suspense } from 'react';
import { Redirect, Switch, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import Routes, { CustomRoute } from '../router.js';

import '../stylesheets/app.scss';
import Progress from './_common/Progress';
import '../stylesheets/antd-themed.css';

const App = ({ location }) => {
  return (
    <div
      className={classNames('main-app', {
        greyed: !!location && location.pathname === '/',
      })}
    >
      <div className="app-content">
        <Suspense fallback={<Progress style={{ top: '60%', left: '50%' }} />}>
          <Routes />
        </Suspense>
      </div>
    </div>
  );
};

export default withRouter(App);
