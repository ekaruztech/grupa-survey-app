import { isFunction } from 'lodash';
import { push } from 'connected-react-router';
import {
  apiRequest,
  GET_SURVEY,
  ADD_OR_UPDATE_SURVEY_QUESTION,
  DELETE_SURVEY_QUESTION,
  FETCH_SURVEY,
  ADD_SURVEY,
} from '../actions';

const getSurvey = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === GET_SURVEY.START) {
    const { surveyId, key, onSuccess, ...rest } = action.meta;
    dispatch(
      apiRequest({
        method: 'GET',
        url: `/surveys/${surveyId}`,
        key: key || 'getSurvey',
        onSuccess: data => {
          dispatch({ type: GET_SURVEY.SUCCESS, payload: data });
          if (isFunction(onSuccess)) onSuccess(data);
        },
        ...rest,
      })
    );
  }
};

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

const addOrUpdateSurveyQuestion = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === ADD_OR_UPDATE_SURVEY_QUESTION.START) {
    const { surveyId, key, onSuccess, ...rest } = action.meta;
    dispatch(
      apiRequest({
        method: 'PUT',
        url: `/surveys/${surveyId}/addOrUpdateQuestion`,
        key: key || 'addOrUpdateQuestion',
        onSuccess: data => {
          dispatch({
            type: ADD_OR_UPDATE_SURVEY_QUESTION.SUCCESS,
            payload: data,
          });
          if (isFunction(onSuccess)) onSuccess(data);
        },
        ...rest,
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
          dispatch(push(`/surveys/${data.id}`));
        },
        ...action.meta,
      })
    );
  }
};

const deleteSurveyQuestion = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === DELETE_SURVEY_QUESTION.START) {
    const { surveyId, key, onSuccess, questionId, ...rest } = action.meta;
    dispatch(
      apiRequest({
        method: 'DELETE',
        url: `/surveys/${surveyId}/removeQuestion/${questionId}`,
        key: key || 'deleteSurveyQuesiton',
        onSuccess: data => {
          dispatch({ type: DELETE_SURVEY_QUESTION.SUCCESS, payload: data });
          if (isFunction(onSuccess)) onSuccess(data);
        },
        ...rest,
      })
    );
  }
};
export default [
  getSurvey,
  addOrUpdateSurveyQuestion,
  deleteSurveyQuestion,
  fetchSurveys,
  addSurvey,
];
