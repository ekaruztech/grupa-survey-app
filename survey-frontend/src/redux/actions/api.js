import { createActionType } from '../../utils/functions';
export const API_REQUEST = createActionType('API_REQUEST', 'API Request');

export const apiRequest = meta => ({
  type: API_REQUEST.START,
  meta,
});
