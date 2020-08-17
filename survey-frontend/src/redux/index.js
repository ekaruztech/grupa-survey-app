import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';
import app from './reducers/app';

// main reducers
export default history =>
  combineReducers({
    router: connectRouter(history),
    form: formReducer,
    app,
  });
