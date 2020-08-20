import { Redirect } from 'react-router-dom';
import React from 'react';
import Users from './components/route/Users';
import Login from './components/route/Authentication/Login';
import Survey from './components/route/Survey';
import Home from './components/route/Home';
import Register from './components/route/Authentication/Register';
import VerifyUser from './components/route/Authentication/Verify/ByLink';
import VerifyCode from './components/route/Authentication/Verify/ByCode';
import PasswordRequestEmail from './components/route/Authentication/Password/RequestEmail';
import resetPassword from './components/route/Authentication/Password/Update';
import SurveyList from './components/route/Survey/SurveysList';

export const generalRoutes = [
  { exact: true, path: '/login', component: Login },
  { exact: true, path: '/register', component: Register },
  { exact: true, path: '/verify-code', component: VerifyCode, isPrivate: true },
  { exact: true, path: '/verify-user/:email/:hash', component: VerifyUser },
  {
    exact: true,
    path: '/password/request-email',
    component: PasswordRequestEmail,
  },
  { exact: true, path: '/password/update', component: resetPassword },
];
export const layoutRoutes = [
  { exact: true, path: '/', component: Home },
  { exact: true, path: '/surveys', component: SurveyList, isPrivate: true },
  { exact: true, path: `/surveys/:id`, component: Survey, isPrivate: true },
  {
    exact: true,
    path: `/surveys/:id/takeSurvey`,
    component: Users,
    isPrivate: true,
  },
];
