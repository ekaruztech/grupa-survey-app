import api from './api';
import auth from './auth';
import app from './app';
import survey from './survey';

export default [...api, ...auth, ...app, ...survey];
