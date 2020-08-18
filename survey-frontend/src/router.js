import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import React from 'react';
import { toast } from 'react-toastify';
import routes from './routes';
import store from './redux/store';
import { setNextUrl } from './redux/actions';
import Page404 from './components/route/ErrorPages/Page404';
import PageLayout from './components/_common/PageLayout';

export const CustomRoute = customProps => {
  const { component: Component, isPrivate, location, ...rest } = customProps;
  const { auth } = store.getState();
  const isVerified = !!auth.user && auth.user.account_verified;
  const isLoggedIn =
    auth.sessionTimeExpiration &&
    auth.sessionTimeExpiration > new Date().getTime() / 1000;
  return (
    <Route
      {...rest}
      render={props => {
        if (isPrivate && !isLoggedIn) {
          if (!!location && location.pathname) {
            store.dispatch(setNextUrl(location.pathname));
          }
          toast.error('You need to be logged in to see this page');
          return <Redirect to="/login" />;
        } else if (isPrivate && isLoggedIn && !isVerified) {
          return <Redirect to="/verify-code" />;
        }
        return (
          // <ErrorBoundary>
          <PageLayout>
            <Component {...props} />
          </PageLayout>
          // </ErrorBoundary>
        );
      }}
    />
  );
};
const CustomerRouteComponent = withRouter(CustomRoute);
export default () => {
  return (
    <Switch>
      {routes.map((props, index) => (
        <CustomerRouteComponent key={index} {...props} />
      ))}
      <CustomerRouteComponent component={Page404} />
    </Switch>
  );
};
