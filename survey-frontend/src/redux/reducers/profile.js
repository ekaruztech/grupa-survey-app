import {

} from '../actions';

const defaultState = {
};

const userReducer = (state = defaultState, action) => {
  const { payload } = action;
  switch (action.type) {

    default:
      return state;
  }
};

export default userReducer;
