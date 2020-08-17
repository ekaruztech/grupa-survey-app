import { createActionType } from '../../utils/functions';

export const LOADING_FEEDBACK = createActionType(
  'LOADING_FEEDBACK',
  'UI/Loading'
);
export const UNREGISTER_LOADING_FEEDBACK = createActionType(
  'UNREGISTER_LOADING_FEEDBACK',
  'UI/Loading'
);
export const OPEN_MODAL = createActionType('OPEN_MODAL', 'UI');
export const CLOSE_MODAL = createActionType('CLOSE_MODAL', 'UI');
export const SET_NEXT_URL = createActionType('SET_NEXT_URL', 'Location');
export const UPDATE_UI_ERROR = createActionType('UPDATE_UI_ERROR', 'UI/Error');
export const RESET_ERROR_STATE = createActionType(
  'RESET_ERROR_STATE',
  'UI/Error'
);
export const UPDATE_PAGINATION = createActionType(
  'UPDATE_PAGINATION',
  'UI/Pagination'
);
export const RESET_PAGINATION = createActionType(
  'RESET_PAGINATION',
  'UI/Pagination'
);
export const SET_FILTER = createActionType('SET_FILTER');

export const startUIFeedback = key => ({ type: LOADING_FEEDBACK.START, key });
export const stopUIFeedback = key => ({ type: LOADING_FEEDBACK.END, key });
export const unRegisterUIFeedback = key => ({
  type: UNREGISTER_LOADING_FEEDBACK.START,
  key,
});
export const updateUIError = (key, payload = 'Something went wrong') => ({
  type: UPDATE_UI_ERROR.START,
  key,
  payload,
});
export const resetErrorState = key => ({
  type: RESET_ERROR_STATE.START,
  key,
});
export const updatePagination = (key, payload) => ({
  type: UPDATE_PAGINATION.START,
  key,
  payload,
});
export const setFilter = (key, payload) => ({
  type: SET_FILTER.START,
  key,
  payload,
});
export const openModal = key => ({ type: OPEN_MODAL.START, key });
export const closeModal = key => ({ type: CLOSE_MODAL.START, key });
export const setNextUrl = payload => ({ type: SET_NEXT_URL.START, payload });
