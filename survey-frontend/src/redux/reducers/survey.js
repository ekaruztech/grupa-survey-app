import {
  ADD_OR_UPDATE_SURVEY_QUESTION,
  DELETE_SURVEY_QUESTION,
  GET_SURVEY,
} from '../actions';

const initialState = {
  current: null,
  byList: [],
};

const surveyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SURVEY.SUCCESS:
    case DELETE_SURVEY_QUESTION.SUCCESS:
    case ADD_OR_UPDATE_SURVEY_QUESTION.SUCCESS:
      return { ...state, current: action.payload };
    default:
      return state;
  }
};

export default surveyReducer;
