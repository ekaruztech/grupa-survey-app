import jwtDecode from 'jwt-decode';
import { push } from 'connected-react-router';
import { get, pick } from 'lodash';
import { toast } from 'react-toastify';
import {
  apiRequest,
  FACEBOOK_AUTH,
  GOOGLE_AUTH,
  LOGIN,
  LOGOUT,
  REGISTER,
  RESEND_REG_VERIFICATION_CODE,
  resetAuthentication,
  SEND_PASSWORD_RESET_EMAIL,
  setNextUrl,
  UPDATE_PASSWORD,
  updateAuthSettings,
  VERIFY_REGISTRATION_CODE,
  VERIFY_USER_BY_EMAIL,
} from '../actions';
import { history } from '../store';

const KEY_MAPS = {
  login: 'login',
  register: 'register',
  verifyRegistrationCode: 'verifyRegistrationCode',
  resendRegVerificationCode: 'resendRegVerificationCode',
  sendPasswordResetEmail: 'sendPasswordResetEmail',
  verifyRegistrationEmail: 'verifyRegistrationEmail',
  googleAuth: 'googleAuth',
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
        url: '/signIn',
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
        url: '/signUp',
        key,
        ...rest,
        onSuccess: (data, response) => {
          saveCustomerSession(response, dispatch);
          onAuthSuccess({
            data,
            dispatch,
            key,
            getState,
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
          onAuthSuccess({
            data,
            dispatch,
            key,
            getState,
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
            user: pick(data, ['_id', 'email', 'accountVerified']),
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
        onSuccess: data => onAuthSuccess({ data, dispatch, key }),
      })
    );
  }
  next(action);
};

const sendPasswordResetEmail = ({ dispatch }) => next => action => {
  if (action.type === SEND_PASSWORD_RESET_EMAIL.START) {
    const { payload, ...rest } = action;
    const key = KEY_MAPS.sendPasswordResetEmail;
    dispatch(
      apiRequest({
        method: 'POST',
        url: '/sendResetPasswordCodeLink',
        key,
        payload,
        ...rest,
        onSuccess: data => {
          if (data && data.email) {
            const payload = {
              user: {
                email: data.email,
              },
            };
            dispatch(updateAuthSettings(payload));
            onAuthSuccess({ data, dispatch, key });
          }
        },
      })
    );
  }
  next(action);
};

const resetPassword = ({ dispatch }) => next => action => {
  if (action.type === UPDATE_PASSWORD.START) {
    const { ...rest } = action;
    const key = 'resetPassword';
    dispatch(
      apiRequest({
        method: 'POST',
        url: '/resetPassword',
        key,
        successMessage: 'You have changed your password!',
        ...rest,
        onSuccess: () => dispatch(push('/login')),
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
            getState,
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
            getState,
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
    dispatch(setNextUrl(null));
    if (pathname && pathname !== '/login') {
      dispatch(push('/login'));
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
  resetPassword,
  logout,
];

const onAuthSuccess = ({ data, dispatch, key, getState }) => {
  if (
    [
      KEY_MAPS.googleAuth,
      KEY_MAPS.facebookAuth,
      KEY_MAPS.login,
      KEY_MAPS.verifyRegistrationCode,
      KEY_MAPS.verifyRegistrationEmail,
    ].includes(key)
  ) {
    if (!data.accountVerified) {
      dispatch(push('/verify-code'));
    } else {
      attemptUserLogIn({
        data,
        dispatch,
        getState,
        key,
      });
    }
  }
  if (key === KEY_MAPS.register) {
    const { email, accountVerified } = data;
    const payload = {
      user: {
        email,
        accountVerified,
      },
    };
    dispatch(updateAuthSettings(payload));
    dispatch(push('/verify-code'));
  }
  /*
  if (key === KEY_MAPS.resendRegVerificationCode) {
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
  }*/
  if (key === KEY_MAPS.sendPasswordResetEmail) {
    dispatch(push('/password/update'));
  }
  if (key === KEY_MAPS.resetPassword) {
    dispatch(push('/login'));
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

const attemptUserLogIn = ({ data = {}, dispatch, getState }) => {
  const { email, accountVerified, firstName, lastName, _id } = data;
  const payload = {
    user: {
      _id,
      email,
      accountVerified,
      firstName,
      lastName,
    },
  };
  const state = getState();
  dispatch(updateAuthSettings(payload));
  const nextUrl = get(state, 'ui.location.nextUrl');
  dispatch(push(nextUrl || '/dashboard'));
  dispatch(setNextUrl(null));
};
