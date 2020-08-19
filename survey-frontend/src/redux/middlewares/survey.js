import { apiRequest, FETCH_SURVEY, ADD_SURVEY } from '../actions';
import { push } from 'connected-react-router';

const fetchSurveys = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === FETCH_SURVEY.START) {
    dispatch(
      apiRequest({
        method: 'get',
        url: `/surveys`,
        key: 'fetchSurveys',
        onSuccess: FETCH_SURVEY.SUCCESS,
        ...action.meta,
      })
    );
  }
};

const addSurvey = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === ADD_SURVEY.START) {
    dispatch(
      apiRequest({
        method: 'post',
        url: `/surveys`,
        key: 'addSurvey',
        onSuccess: data => {
          dispatch({ type: ADD_SURVEY.SUCCESS, payload: data });
          push(`/surveys/${data.id}`);
        },
        ...action.meta,
      })
    );
  }
};

export default [fetchSurveys, addSurvey];
