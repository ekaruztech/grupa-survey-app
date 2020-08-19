import { reducer as formReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import app from './app';
import ui from './ui';
import auth from './auth';
import profile from './profile';
import surveys from './survey';

// main reducers
export default history =>
  combineReducers({
    router: connectRouter(history),
    form: formReducer,
    app,
    auth,
    ui,
    profile,
    surveys,
  });
