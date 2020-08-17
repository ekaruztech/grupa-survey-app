// reducer with initial state
import omit from 'lodash/omit';
import {
  SET_NEXT_URL,
  LOADING_FEEDBACK,
  UPDATE_UI_ERROR,
  UPDATE_PAGINATION,
  SET_FILTER,
  RESET_PAGINATION,
  OPEN_MODAL,
  CLOSE_MODAL,
  UNREGISTER_LOADING_FEEDBACK,
  RESET_ERROR_STATE,
} from '../actions';

const initialState = {
  loading: {},
  errors: {},
  pagination: {},
  modal: {},
  filter: {},
  location: {
    current: location.pathname,
    nextUrl: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NEXT_URL.START:
      return {
        ...state,
        location: {
          ...state.location,
          nextUrl: action.payload,
        },
      };
    case LOADING_FEEDBACK.START:
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.key]: true,
        },
      };
    case UNREGISTER_LOADING_FEEDBACK.START: {
      const key = action.key;
      const loading = omit(state.loading, key);
      return {
        ...state,
        loading,
      };
    }
    case LOADING_FEEDBACK.END:
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.key]: false,
        },
      };
    case UPDATE_UI_ERROR.START:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.key]: action.payload,
        },
      };
    case RESET_ERROR_STATE.START: {
      if (action.key) {
        const errors = omit(state.errors, action.key);
        return {
          ...state,
          errors,
        };
      }
      return {
        ...state,
        errors: {},
      };
    }
    case UPDATE_PAGINATION.START:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          [action.key]: { ...state.pagination[action.key], ...action.payload },
        },
      };
    case SET_FILTER.START:
      return {
        ...state,
        filter: {
          ...state.filter,
          [action.key]: { ...state.filter[action.key], ...action.payload },
        },
      };
    case RESET_PAGINATION.START:
      return {
        ...state,
        pagination: {
          ...omit(state.pagination, action.key),
        },
      };
    case OPEN_MODAL.START:
      return {
        ...state,
        modal: {
          ...state.modal,
          [action.key]: true,
        },
      };
    case CLOSE_MODAL.START:
      return {
        ...state,
        modal: {
          ...state.modal,
          [action.key]: false,
        },
      };
    default:
      return state;
  }
};
