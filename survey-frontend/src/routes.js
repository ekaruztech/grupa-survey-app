import React from 'react';
import Home from './components/route/Home';
import Login from './components/route/Authentication/Login';

export default [
  { exact: true, path: '/', component: Home },
  { exact: true, path: '/login', component: Login },
];
