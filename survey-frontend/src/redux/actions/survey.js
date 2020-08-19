import { createActionType } from '../../utils/functions';

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
