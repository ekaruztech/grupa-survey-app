import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import React from 'react';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import routes from './routes';
import store from './redux/store';
import { setNextUrl } from './redux/actions';
import ErrorBoundary from './components/_common/ErrorBoundary';
import Page404 from './components/route/ErrorPages/Page404';

export const CustomRoute = customProps => {
  const { component: Component, isPrivate, location, ...rest } = customProps;
  const { auth } = store.getState();
  console.log('auth ', auth);
  const isVerified = !!auth.user && auth.user.accountVerified;
  const isLoggedIn =
    auth.sessionTimeExpiration &&
    auth.sessionTimeExpiration > new Date().getTime() / 1000;
  return (
    <Route
      {...rest}
      render={props => {
        const pathname = get(location, 'pathname');
        if (isPrivate && !isLoggedIn) {
          if (pathname) {
            store.dispatch(setNextUrl(location.pathname));
          }
          toast.error('You need to be logged in to see this page');
          return <Redirect to="/login" />;
        } else if (isPrivate && !isVerified) {
          if (pathname && pathname !== '/verify-code') {
            store.dispatch(setNextUrl(location.pathname));
            toast.error('Your account needs to be verified first');
            return <Redirect to="/verify-code" />;
          }
        }
        return (
          <ErrorBoundary>
            <Component {...props} />
          </ErrorBoundary>
        );
      }}
    />
  );
};
const CustomRouteComponent = withRouter(CustomRoute);
export default () => {
  return (
    <Switch>
      {routes.map((props, index) => (
        <CustomRouteComponent key={index} {...props} />
      ))}
      <CustomRouteComponent component={Page404} />
    </Switch>
  );
};
