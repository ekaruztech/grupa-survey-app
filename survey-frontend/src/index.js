import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Detector } from 'react-detect-offline';

import 'react-toastify/dist/ReactToastify.css';
import OfflineView from './components/_common/Layout/OfflineView';
import App from './components/App';
import store, { history, persistor } from './redux/store';

const container = document.getElementById('root');

const main = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        <App />
      </ConnectedRouter>
    </PersistGate>
  </Provider>
);
// render the main component
ReactDOM.render(
  <Detector render={({ online }) => (online ? main : <OfflineView />)} />,
  container
);
