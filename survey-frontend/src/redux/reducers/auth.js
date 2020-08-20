import {
  LOGOUT,
  RESET_AUTHENTICATION,
  SET_SOCIAL_AUTH_MODE,
  UPDATE_AUTH_SETTINGS,
} from '../actions';

const initialState = {
  socialAuthMode: false,
  session: null,
  sessionTimeExpiration: null,
  user: {
    _id: null,
    email: null,
    accountVerified: false,
    role: 'respondent',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT.SUCCESS:
      return initialState;
    case UPDATE_AUTH_SETTINGS.START:
      return {
        ...state,
        ...action.payload,
      };
    case SET_SOCIAL_AUTH_MODE.START:
      return {
        ...state,
        socialAuthMode: action.payload,
      };
    case RESET_AUTHENTICATION.START:
      return initialState;
    default:
      return state;
  }
};
