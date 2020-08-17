import jwtDecode from 'jwt-decode';
import { change } from 'redux-form';
import { push } from 'connected-react-router';
import { get, pick } from 'lodash';
import { toast } from 'react-toastify';
import {
  apiRequest,
  closeModal,
  FACEBOOK_AUTH,
  GOOGLE_AUTH,
  LOGIN,
  LOGOUT,
  openModal,
  REGISTER,
  RESEND_REG_VERIFICATION_CODE,
  SEND_PASSWORD_RESET_EMAIL,
  setNextUrl,
  UPDATE_PASSWORD,
  updateAuthSettings,
  VERIFY_REGISTRATION_CODE,
  VERIFY_USER_BY_EMAIL,
  resetAuthentication,
} from '../actions';
import { history } from '../store';
import mixPanelService from '../../utils/services/mixPanelService';

const KEY_MAPS = {
  login: 'login',
  register: 'register',
  verifyRegistrationCode: 'verifyRegistrationCode',
  resendRegVerificationCode: 'resendRegVerificationCode',
  sendPasswordResetEmail: 'sendPasswordResetEmail',
  verifyRegistrationEmail: 'verifyRegistrationEmail',
  googleAuth: 'googleAuth',
  updatePassword: 'updatePassword',
  resetPassword: 'resetPassword',
  facebookAuth: 'facebookAuth',
};

const login = ({ dispatch, getState }) => next => action => {
  if (action.type === LOGIN.START) {
    const { modal, payload, ...rest } = action;
    const key = KEY_MAPS.login;
    dispatch(
      apiRequest({
        method: 'POST',
        url: '/login',
        key,
        payload: { ...payload, profile_type: 'Customer' },
        ...rest,
        onSuccess: (data, response) => {
          saveCustomerSession(response, dispatch);
          onAuthSuccess({
            data,
            dispatch,
            key,
            getState,
            modal,
            modalReducerKey: key,
          });
        },
        onError: e => {
          const message =
            get(e, 'meta.error.message') ||
            'An error occurred please try again';
          const code = get(e, 'meta.error.code');

          if (!!code && code === 404) {
            toast.error('Incorrect email/password combination');
          } else {
            toast.error(message);
          }
        },
      })
    );
  }
  next(action);
};

const register = ({ dispatch, getState }) => next => action => {
  if (action.type === REGISTER.START) {
    const { modal, ...rest } = action;
    const key = KEY_MAPS.register;
    dispatch(
      apiRequest({
        method: 'POST',
        url: '/register',
        key,
        ...rest,
        onSuccess: (data, response) => {
          saveCustomerSession(response, dispatch);
          onAuthSuccess({
            data,
            dispatch,
            key,
            getState,
            modal,
            modalReducerKey: key,
          });
        },
      })
    );
  }
  next(action);
};

const verifyRegistrationCode = ({ dispatch, getState }) => next => action => {
  if (action.type === VERIFY_REGISTRATION_CODE.START) {
    const { modal, ...rest } = action;
    const key = KEY_MAPS.verifyRegistrationCode;
    dispatch(
      apiRequest({
        method: 'POST',
        url: '/verifyCode',
        key,
        ...rest,
        onSuccess: data => {
          mixPanelService.sendEvent('New user verification ', data);
          onAuthSuccess({
            data,
            dispatch,
            key,
            getState,
            modalReducerKey: key,
            modal,
          });
        },
      })
    );
  }
  next(action);
};

const verifyRegistrationEmail = ({ dispatch, getState }) => next => action => {
  if (action.type === VERIFY_USER_BY_EMAIL.START) {
    const { modal, ...rest } = action;
    const key = KEY_MAPS.verifyRegistrationEmail;
    dispatch(
      apiRequest({
        method: 'POST',
        url: '/verifyLink',
        key,
        suppressToast: true,
        ...rest,
        onSuccess: data => {
          const payload = {
            user: pick(data, ['_id', 'email', 'account_verified']),
          };
          dispatch(updateAuthSettings(payload));
        },
      })
    );
  }
  next(action);
};

const resendRegVerificationCode = ({ dispatch }) => next => action => {
  if (action.type === RESEND_REG_VERIFICATION_CODE.START) {
    const { ...rest } = action;
    const key = KEY_MAPS.resendRegVerificationCode;
    dispatch(
      apiRequest({
        method: 'POST',
        url: '/sendVerification',
        key,
        ...rest,
        onSuccess: data =>
          onAuthSuccess({ data, dispatch, key, modalReducerKey: key }),
      })
    );
  }
  next(action);
};

const sendPasswordResetEmail = ({ dispatch }) => next => action => {
  if (action.type === SEND_PASSWORD_RESET_EMAIL.START) {
    const { payload, modal, ...rest } = action;
    const key = KEY_MAPS.sendPasswordResetEmail;
    dispatch(
      apiRequest({
        method: 'POST',
        url: '/resetPassword',
        key,
        payload,
        ...rest,
        onSuccess: data => {
          if (payload && payload.email) {
            dispatch(change('updatePasswordForm', 'email', payload.email));
            onAuthSuccess({ data, dispatch, key, modalReducerKey: key });
          }
        },
      })
    );
  }
  next(action);
};

const updatePassword = ({ dispatch }) => next => action => {
  if (action.type === UPDATE_PASSWORD.START) {
    const { modal, ...rest } = action;
    const key = 'updatePassword';
    dispatch(
      apiRequest({
        method: 'POST',
        url: '/updatePassword',
        key,
        successMessage: 'You have changed your password!',
        ...rest,
        onSuccess: data => {
          if (modal) {
            dispatch(closeModal(KEY_MAPS.resetPassword));
            dispatch(closeModal(KEY_MAPS.updatePassword));
            dispatch(openModal(KEY_MAPS.login));
          } else {
            dispatch(push('/login'));
          }
        },
      })
    );
  }
  next(action);
};

const doFacebookAuth = ({ dispatch, getState }) => next => action => {
  const {
    ui: { modal },
  } = getState();
  const modalReducerKey =
    (modal.login && 'login') || (modal.register && 'register');
  const { type, payload, ...rest } = action;
  if (type === FACEBOOK_AUTH.START) {
    const key = 'facebookAuth';
    dispatch(
      apiRequest({
        method: 'POST',
        url: '/socialAuth/facebook',
        key,
        payload: { ...payload, profile_type: 'Customer' },
        ...rest,
        onSuccess: (data, response) => {
          saveCustomerSession(response, dispatch);
          onAuthSuccess({
            data,
            dispatch,
            key,
            modalReducerKey,
            getState,
            modal: rest.modal,
          });
        },
      })
    );
  }
  next(action);
};

const doGoogleAuth = ({ dispatch, getState }) => next => action => {
  const {
    ui: { modal },
  } = getState();
  const modalReducerKey =
    (!!modal.login && 'login') || (!!modal.register && 'register');
  const { type, payload, ...rest } = action;
  if (type === GOOGLE_AUTH.START) {
    const key = 'googleAuth';
    dispatch(
      apiRequest({
        method: 'POST',
        url: '/socialAuth/google',
        key,
        payload: { ...payload, profile_type: 'Customer' },
        ...rest,
        onSuccess: (data, response) => {
          saveCustomerSession(response, dispatch);
          onAuthSuccess({
            data,
            dispatch,
            key,
            modalReducerKey,
            getState,
            modal: rest.modal,
          });
        },
      })
    );
  }
  next(action);
};

const logout = ({ dispatch }) => next => action => {
  const { type } = action;
  if (type === LOGOUT.START) {
    const { pathname } = (!!history && history.location) || {};
    dispatch(resetAuthentication());
    mixPanelService.sendEvent('User logout');
    dispatch(setNextUrl(null));
    if (pathname && pathname !== '/') {
      dispatch(push('/'));
    }
  }
  next(action);
};

export default [
  login,
  register,
  verifyRegistrationCode,
  verifyRegistrationEmail,
  resendRegVerificationCode,
  doFacebookAuth,
  doGoogleAuth,
  sendPasswordResetEmail,
  updatePassword,
  logout,
];

const onAuthSuccess = ({
  data,
  dispatch,
  key,
  getState,
  modal,
  modalReducerKey,
}) => {
  if (
    [
      KEY_MAPS.googleAuth,
      KEY_MAPS.facebookAuth,
      KEY_MAPS.login,
      KEY_MAPS.verifyRegistrationCode,
      KEY_MAPS.verifyRegistrationEmail,
    ].includes(key)
  ) {
    if (!data.account_verified) {
      if (modal) {
        dispatch(closeModal(KEY_MAPS[key]));
        dispatch(openModal(KEY_MAPS.verifyRegistrationCode));
      } else {
        dispatch(push('/verify-code'));
      }
    } else {
      attemptUserLogIn({
        data,
        dispatch,
        getState,
        key,
        modal,
        modalReducerKey,
      });
    }
  }
  if (key === KEY_MAPS.register) {
    if (modal) {
      dispatch(closeModal(KEY_MAPS.register));
      dispatch(openModal(KEY_MAPS.verifyRegistrationCode));
    } else {
      const { email, account_verified } = data;
      const payload = {
        user: {
          email,
          account_verified,
        },
      };
      dispatch(updateAuthSettings(payload));
      dispatch(push('/verify-code'));
    }
    mixPanelService.sendEvent('New user registration started ', data);
  }
  if (key === KEY_MAPS.resendRegVerificationCode) {
    mixPanelService.sendEvent('Resend user verification code', data);
    if (getState) {
      const {
        ui: {
          modal: { verifyRegistrationCode },
        },
      } = getState();
      if (!verifyRegistrationCode) {
        dispatch(openModal(KEY_MAPS.verifyRegistrationCode));
      }
    }
  }
  if (key === KEY_MAPS.sendPasswordResetEmail) {
    mixPanelService.sendEvent('Password reset email sent', data);
    dispatch(closeModal(key));
    dispatch(openModal(KEY_MAPS.updatePassword));
  }
  if (key === KEY_MAPS.updatePassword) {
    dispatch(closeModal(key));
    if (modal) {
      dispatch(openModal(KEY_MAPS.login));
    } else {
      dispatch(push('/login'));
    }
  }
};

const saveCustomerSession = (response, dispatch) => {
  const session = get(response, 'meta.token');
  if (session) {
    const decoded = jwtDecode(session);
    const sessionTimeExpiration = decoded.exp;
    dispatch(updateAuthSettings({ session, sessionTimeExpiration }));
  }
};

const attemptUserLogIn = ({
  data = {},
  dispatch,
  getState,
  key,
  modalReducerKey,
  modal,
}) => {
  const getLoginSource = key => {
    switch (key.toUpperCase()) {
      case 'FACEBOOKAUTH':
        return 'facebook';
      case 'GOOGLEAUTH':
        return 'google';
      default:
        return 'regular';
    }
  };
  const { email, account_verified, first_name, last_name, _id } = data;
  const payload = {
    user: {
      _id,
      email,
      account_verified,
    },
  };
  const state = getState();
  dispatch(updateAuthSettings(payload));
  const nextUrl = get(state, 'ui.location.nextUrl');
  if (modal) {
    dispatch(closeModal(modalReducerKey));
    if (nextUrl) {
      dispatch(push(nextUrl));
      dispatch(setNextUrl(null));
    }
  } else {
    dispatch(push(nextUrl || '/dashboard'));
    dispatch(setNextUrl(null));
  }
  mixPanelService.saveProfile(email, {
    name: `${first_name || ''} ${last_name || ''}`.trim() || 'Not Available',
    email,
    _id,
    source: getLoginSource(key),
  });
  mixPanelService.sendEvent('User logged in');
};
