import api from './api';
import auth from './auth';
import app from './app';
import profile from './profile';
import survey from './survey';

export default [...api, ...auth, ...app, ...profile, ...survey];
