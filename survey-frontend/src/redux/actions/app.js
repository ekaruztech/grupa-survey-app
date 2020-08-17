import { createActionType } from '../../utils/functions';

export const APP_LOADED = createActionType('APP_LOADED');
export const RESET_APP_STATE = createActionType('RESET_APP_STATE', 'App');
export const UPDATE_APP_SETTINGS = createActionType(
  'UPDATE_APP_SETTINGS',
  'App'
);
export const GET_APP_METADATA = createActionType('GET_APP_METADATA', 'App');

export const appLoaded = () => ({ type: APP_LOADED.START });
export const getAppMetadata = apiKey => ({
  type: GET_APP_METADATA.START,
  apiKey,
});
export const updateAppSettings = payload => ({
  type: UPDATE_APP_SETTINGS.START,
  payload,
});
export const resetAppState = () => ({ type: RESET_APP_STATE.START });
