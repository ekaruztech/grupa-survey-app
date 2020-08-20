import { createActionType, createActionString } from '../../utils/functions';

const entity = 'SURVEY';
export const GET_SURVEY = createActionType('GET_SURVEY', entity);
export const ADD_OR_UPDATE_SURVEY_QUESTION = createActionType(
  'ADD_OR_UPDATE_SURVEY_QUESTION',
  entity
);
export const DELETE_SURVEY_QUESTION = createActionType(
  'DELETE_SURVEY_QUESTION',
  entity
);
export const SUBMIT_SURVEY_RESPONSE = createActionType(
  'SUBMIT_SURVEY_RESPONSE',
  entity
);
export const RESET_CURRENT_SURVEY = createActionString(
  'RESET_CURRENT_SURVEY',
  entity
);
export const GET_SURVEY_RESPONSE = createActionType(
  'GET_SURVEY_RESPONSE',
  entity
);

export const resetCurrentSurvey = () => ({
  type: RESET_CURRENT_SURVEY,
});

export const getSurvey = (surveyId, params, key, onSuccess) => ({
  type: GET_SURVEY.START,
  meta: {
    surveyId,
    params,
    key,
    onSuccess,
  },
});
export const getSurveyResponse = (surveyId, params, key, onSuccess) => ({
  type: GET_SURVEY_RESPONSE.START,
  meta: {
    surveyId,
    params,
    key,
    onSuccess,
  },
});
export const addOrUpdateSurveyQuestion = (
  surveyId,
  payload,
  params,
  key,
  onSuccess
) => ({
  type: ADD_OR_UPDATE_SURVEY_QUESTION.START,
  meta: {
    surveyId,
    params,
    key,
    onSuccess,
    payload,
  },
});
export const deleteSurveyQuestion = (
  surveyId,
  questionId,
  params,
  key,
  onSuccess
) => ({
  type: DELETE_SURVEY_QUESTION.START,
  meta: {
    surveyId,
    questionId,
    params,
    key,
    onSuccess,
  },
});

export const FETCH_SURVEY = createActionType('FETCH_SURVEY', 'survey');
export const ADD_SURVEY = createActionType('ADD_SURVEY', 'survey');

export const fetchSurveys = (params = {}) => ({
  type: FETCH_SURVEY.START,
  meta: { params },
});

export const addSurvey = payload => ({
  type: ADD_SURVEY.START,
  meta: { payload },
});

export const submitSurveyResponse = (
  surveyId,
  payload,
  params,
  key,
  onSuccess
) => ({
  type: SUBMIT_SURVEY_RESPONSE.START,
  meta: {
    surveyId,
    payload,
    params,
    key,
    onSuccess,
  },
});
