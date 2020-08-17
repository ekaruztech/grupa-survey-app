import axios from 'axios';
import authService from './authService';

// Default config options
const defaultOptions = {
  baseURL: process.env.REACT_APP_API_HOST,
  headers: {},
};

// Create instance
const instance = axios.create(defaultOptions);

instance.interceptors.request.use(
  config => {
    config.headers['x-client-key'] = process.env.REACT_APP_API_CLIENT_KEY;
    if (authService.isLoggedIn()) {
      config.headers['x-access-token'] = authService.getCustomerSession();
    }
    config.headers['x-api-key'] = process.env.REACT_APP_API_KEY;
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);
// Add a response interceptor
instance.interceptors.response.use(
  response => {
    // Do something with response data
    return response.data;
  },
  error => {
    if (error.response) {
      if (error.code === 'ECONNABORTED')
        throw 'Network timeout, please try again';
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      error.message =
        'This request is taking too long, please check your network';
      throw error;
    } else {
      // Something happened in setting up the request that triggered an Error
      throw error;
    }
  }
);
export default instance;

export const createAxiosRequest = config => instance(config);
