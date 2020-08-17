import { createActionType } from '../../utils/functions';

export const UPDATE_USER_DETAILS = createActionType(
  'UPDATE_USER_DETAILS',
  'User'
);
export const GET_USER_DETAILS = createActionType('GET_USER_DETAILS', 'User');
