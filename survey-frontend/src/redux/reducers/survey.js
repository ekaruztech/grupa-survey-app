import {
  ADD_OR_UPDATE_SURVEY_QUESTION,
  DELETE_SURVEY_QUESTION,
  GET_SURVEY,
  FETCH_SURVEY,
  ADD_SURVEY,
  RESET_CURRENT_SURVEY,
  GET_SURVEY_RESPONSE,
  UPDATE_SURVEY_STATUS,
} from '../actions';

const initialState = {
  current: null,
  byList: [],
  surveyResponse: null,
};

const surveyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SURVEY.SUCCESS:
    case DELETE_SURVEY_QUESTION.SUCCESS:
    case ADD_OR_UPDATE_SURVEY_QUESTION.SUCCESS:
      return { ...state, current: action.payload };
    case UPDATE_SURVEY_STATUS.SUCCESS:
      const byList = state.byList.map(survey => {
        if (survey._id === action.payload?._id) {
          return action.payload;
        } else {
          return survey;
        }
      });
      return { ...state, byList, current: action.payload };
    case RESET_CURRENT_SURVEY:
      return { ...state, current: null };
    case FETCH_SURVEY.SUCCESS:
      return { ...state, byList: action.payload };
    case GET_SURVEY_RESPONSE.SUCCESS:
      return { ...state, surveyResponse: action.payload };
    case ADD_SURVEY.SUCCESS:
      return {
        ...state,
        current: action.payload,
        byList: [action.payload, ...state.byList],
      };
    default:
      return state;
  }
};

export default surveyReducer;
