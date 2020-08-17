import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';
import app from './app';
import ui from './ui';
import auth from './auth';
import profile from './profile';

// main reducers
export default history =>
  combineReducers({
    router: connectRouter(history),
    form: formReducer,
    app,
    auth,
    ui,
    profile,
  });
