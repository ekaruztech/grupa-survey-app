import { APP_LOADED, RESET_APP_STATE, GET_APP_METADATA } from '../actions';

const initialState = {
  name: 'VoomTravel',
  firstTime: false,
  terminals: [],
  settings: {
    ui: {},
  },
};
export default (state = initialState, action) => {
  switch (action.type) {
    case APP_LOADED.START:
      return {
        ...state,
        firstTime: true,
      };
    case GET_APP_METADATA.SUCCESS:
      const { locations: terminals, ...rest } = action.payload;
      return {
        ...state,
        terminals,
        ...rest,
      };
    case RESET_APP_STATE.START:
      return initialState;
    default:
      return state;
  }
};
