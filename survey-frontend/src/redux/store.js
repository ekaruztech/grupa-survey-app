import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import { createBrowserHistory } from 'history';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import customMiddleWares from './middlewares';
import createRootReducer from './reducers';

const history = createBrowserHistory();

const persistConfig = {
  key: 'voomsway',
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['app', 'auth'],
};

// Implement a top-level app reducer to handle user logout and nullify state.
const persistedReducer = persistReducer(
  persistConfig,
  createRootReducer(history)
);

// add the middleWares
const middleWares = [...customMiddleWares, routerMiddleware(history)];

if (process.env.NODE_ENV !== 'production') {
  middleWares.push(createLogger());
}

// apply the middleware
let middleware = applyMiddleware(...middleWares);

if (
  process.env.NODE_ENV !== 'production' &&
  window.__REDUX_DEVTOOLS_EXTENSION__
) {
  middleware = compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__());
}

// create the store
const store = createStore(persistedReducer, middleware);
const persistor = persistStore(store);
// export
export { store as default, history, persistor };
