import { isFunction } from 'lodash';
import {
  apiRequest,
  GET_SURVEY,
  ADD_OR_UPDATE_SURVEY_QUESTION,
  DELETE_SURVEY_QUESTION,
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
export default [getSurvey, addOrUpdateSurveyQuestion, deleteSurveyQuestion];
