import api from './api';
import auth from './auth';
import app from './app';
import profile from './profile';

export default [
  ...api,
  ...auth,
  ...app,
  ...profile,
];
