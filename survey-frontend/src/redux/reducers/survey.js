import {
  ADD_OR_UPDATE_SURVEY_QUESTION,
  DELETE_SURVEY_QUESTION,
  GET_SURVEY,
  FETCH_SURVEY,
  ADD_SURVEY,
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
    case FETCH_SURVEY.SUCCESS:
      return { ...state, byList: action.payload };
    case ADD_SURVEY.SUCCESS:
      return {
        ...state,
        current: action.payload,
        byList: [action.payload, ...state.byList],
      };
  }
};

export default surveyReducer;
