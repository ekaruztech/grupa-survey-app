import { parse } from 'query-string';
import {
  APP_LOADED,

} from '../actions';

const watchUrlChange = ({ dispatch }) => next => action => {
  if (action.type === '@@router/LOCATION_CHANGE') {
    const query = parse(location.search);

  }
  next(action);
};

const appLoaded = ({ dispatch }) => next => action => {
  if (action.type === APP_LOADED.START) {
  }
  next(action);
};

export default [watchUrlChange, appLoaded];
