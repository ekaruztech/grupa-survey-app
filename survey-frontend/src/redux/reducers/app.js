import { APP_LOADED, RESET_APP_STATE, GET_APP_METADATA } from '../actions';

const initialState = {
  name: 'Surveylie',
  firstTime: false,
  meta: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case APP_LOADED.START:
      return {
        ...state,
        firstTime: true,
      };
    case GET_APP_METADATA.SUCCESS:
      return {
        ...state,
        meta: action.payload,
      };
    case RESET_APP_STATE.START:
      return initialState;
    default:
      return state;
  }
};
