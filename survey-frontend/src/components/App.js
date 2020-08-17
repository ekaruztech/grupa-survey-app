import React, { Suspense } from 'react';
import { Redirect, Switch, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import Routes, { CustomRoute } from '../router.js';

import Header from './_common/Layout/Header';
import Footer from './_common/Layout/Footer';
import '../stylesheets/app.scss';
import Progress from './_common/Progress';
import Page404 from './route/ErrorPages/Page404';

const App = ({ location }) => {
  return (
    <div
      className={classNames('main-app', {
        greyed: !!location && location.pathname === '/',
      })}
    >
      <div className="app-content">
        <Header />
        <Suspense fallback={<Progress style={{ top: '60%', left: '50%' }} />}>
          <Routes />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
};

export default withRouter(App);
