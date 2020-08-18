import React from 'react';
import Home from './components/route/Home';
import Login from './components/route/Authentication/Login';
import Register from './components/route/Authentication/Register';
import VerifyUser from './components/route/Authentication/Verify/ByLink';
import VerifyCode from './components/route/Authentication/Verify/ByCode';
import PasswordRequestEmail from './components/route/Authentication/Password/RequestEmail';
import resetPassword from './components/route/Authentication/Password/Update';

export default [
  { exact: true, path: '/', component: Home, isPrivate: true },
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
