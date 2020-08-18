import React from 'react';
import Home from './components/route/Home';
import Login from './components/route/Authentication/Login';
import Survey from './components/route/Survey';

export default [
  { exact: true, path: '/login', component: Login },
  { exact: true, path: '/', component: Home },
  { exact: true, path: '/surveys', component: Survey },
];
