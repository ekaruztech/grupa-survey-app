import React from 'react';
import { isEmpty, get } from 'lodash';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';
import sentryService from '../../utils/services/sentryService';
import { createAxiosRequest } from '../../utils/services/request';
import { formatMessagesFromError } from '../../utils/functions';
import {
  API_REQUEST,
  updateUIError,
  updatePagination,
  startUIFeedback,
  stopUIFeedback,
  logout,
} from '../actions';

const apiRequest = ({ dispatch, getState }) => next => action => {
  if (action.type === API_REQUEST.START) {
    const {
      method,
      url,
      key,
      payload,
      onError,
      params,
      onSuccess,
      nextRoute,
      errorMessage,
      suppressToast = false,
      successMessage,
    } = action.meta;
    const config = { method, url };
    if (payload && (!isEmpty(payload) || payload instanceof FormData)) {
      config.data = payload;
    }
    if (params && !isEmpty(params)) {
      config.params = params;
    }
    dispatch(startUIFeedback(key));
    createAxiosRequest(config)
      .then(response => {
        const { data, meta } = response;
        const pagination = get(response, 'meta.pagination');
        if (pagination) {
          dispatch(updatePagination(key, pagination));
        }
        if (onSuccess && typeof onSuccess === 'function') {
          onSuccess(data, response);
        } else {
          dispatch({ type: onSuccess, payload: data });
        }

        const message = successMessage || get(meta, 'message');
        if (message) {
          toast(message);
        }
        dispatch(stopUIFeedback(key));
        if (nextRoute) {
          dispatch(push(nextRoute));
        }
      })
      .catch(e => {
        const showErrorMessage = message => {
          if (!suppressToast && method.toLowerCase() !== 'get' && message) {
            toast.error(message);
          }
        };
        if (onError) {
          if (typeof onError !== 'function') {
            throw new Error('onError parameter should be a function');
          }
          onError(e);
        } else {
          const error = get(e, 'meta.error');
          const toastMessage = errorMessage || formatMessagesFromError(error);
          if (!!error && !!error.code && error.code === 401) {
            if (!suppressToast) showErrorMessage('You need to be logged in');
            dispatch(logout());
            dispatch(push('/login'));
          } else {
            dispatch(updateUIError(key, error));
            if (!suppressToast) showErrorMessage(toastMessage);
          }
          sentryService.sendError(error, {
            method,
            url,
            key,
          });
        }
        dispatch(stopUIFeedback(key));
      });
  }
  return next(action);
};

export default [apiRequest];
