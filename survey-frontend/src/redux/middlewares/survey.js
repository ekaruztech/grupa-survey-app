import { isFunction } from 'lodash';
import { push } from 'connected-react-router';
import {
  ADD_OR_UPDATE_SURVEY_QUESTION,
  ADD_SURVEY,
  apiRequest,
  DELETE_SURVEY_QUESTION,
  FETCH_SURVEY,
  GET_SURVEY,
  SUBMIT_SURVEY_RESPONSE,
  GET_SURVEY_RESPONSE,
  UPDATE_SURVEY_STATUS,
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
const updateSurveyStatus = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === UPDATE_SURVEY_STATUS.START) {
    const { surveyId, key, onSuccess, payload, ...rest } = action.meta;
    dispatch(
      apiRequest({
        method: 'PUT',
        url: `/surveys/${surveyId}/status/${payload.status}`,
        key: key || 'updateSurveyStatus',
        onSuccess: data => {
          dispatch({ type: UPDATE_SURVEY_STATUS.SUCCESS, payload: data });
          if (isFunction(onSuccess)) onSuccess(data);
        },
        ...rest,
      })
    );
  }
};

const getSurveyResponse = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === GET_SURVEY_RESPONSE.START) {
    const { surveyId, key, onSuccess, ...rest } = action.meta;
    dispatch(
      apiRequest({
        method: 'GET',
        url: `/surveys/${surveyId}/results`,
        key: key || 'getSurveyResponse',
        onSuccess: data => {
          dispatch({ type: GET_SURVEY_RESPONSE.SUCCESS, payload: data });
          if (isFunction(onSuccess)) onSuccess(data);
        },
        ...rest,
      })
    );
  }
};

const submitSurveyResponse = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === SUBMIT_SURVEY_RESPONSE.START) {
    const { surveyId, key, onSuccess, ...rest } = action.meta;
    dispatch(
      apiRequest({
        method: 'PUT',
        url: `/surveys/${surveyId}/response`,
        key: key || 'submitSurveyResponse',
        onSuccess: data => {
          dispatch({ type: SUBMIT_SURVEY_RESPONSE.SUCCESS, payload: data });
          if (isFunction(onSuccess)) onSuccess(data);
        },
        ...rest,
      })
    );
  }
};
const fetchSurveys = ({ dispatch, getState }) => next => action => {
  next(action);
  if (action.type === FETCH_SURVEY.START) {
    const state = getState();
    const auth = state.auth;
    const url = auth.session ? '/surveys' : '/surveys/find';
    dispatch(
      apiRequest({
        url,
        method: 'get',
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
  submitSurveyResponse,
  getSurveyResponse,
  updateSurveyStatus,
];
