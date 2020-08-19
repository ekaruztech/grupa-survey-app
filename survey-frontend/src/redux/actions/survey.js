import { createActionType } from '../../utils/functions';

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

export const getSurvey = (surveyId, params, key, onSuccess) => ({
  type: GET_SURVEY.START,
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
