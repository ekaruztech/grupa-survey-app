import { FETCH_SURVEY, ADD_SURVEY } from '../actions';

const defaultState = {
  byList: [],
  current: null,
};

const userReducer = (state = defaultState, action) => {
  const { payload } = action;
  switch (action.type) {
    case FETCH_SURVEY.SUCCESS:
      return Object.assign({}, state, { byList: payload });
    case ADD_SURVEY.SUCCESS:
      console.log('reducer:::', payload);
      return Object.assign({}, state, {
        current: payload,
        byList: [payload, ...state.byList],
      });
    default:
      return state;
  }
};

export default userReducer;
