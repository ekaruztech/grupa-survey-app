import {
  apiRequest,
  UPDATE_USER_DETAILS,
} from '../actions';


const updateUserDetails = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === UPDATE_USER_DETAILS.START) {
    dispatch(
      apiRequest({
        method: 'PUT',
        url: `/users/${action.meta.payload._id}`,
        key: 'updateUser',
        onSuccess: UPDATE_USER_DETAILS.SUCCESS,
        ...action.meta,
      })
    );
  }
};

export default [
  updateUserDetails,
];
