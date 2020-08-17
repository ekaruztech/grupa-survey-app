import 'bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Detector } from 'react-detect-offline';
import { dom, library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowCircleLeft,
  faArrowRight,
  faCar,
  faCaretDown,
  faCheck,
  faChevronCircleRight,
  faArrowAltCircleDown,
  faCoins,
  faExclamationTriangle,
  faInbox,
  faPrint,
  faShareAlt,
  faTimes,
  faTimesCircle,
  faTrash,
  faUsers,
  faCheckCircle,
  faCopy,
  faEye,
  faAngleRight,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faGoogle,
  faFacebookSquare,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import OfflineView from './components/_common/Layout/OfflineView';
import App from './components/App';
import store, { history, persistor } from './redux/store';

library.add(
  faCheck,
  faArrowRight,
  faPrint,
  faShareAlt,
  faExclamationTriangle,
  faFacebookSquare,
  faArrowCircleLeft,
  faCaretDown,
  faTimes,
  faCoins,
  faUsers,
  faCar,
  faFacebook,
  faInstagram,
  faTwitter,
  faChevronCircleRight,
  faArrowAltCircleDown,
  faCheckCircle,
  faTrash,
  faInbox,
  faGoogle,
  faCopy,
  faTimesCircle,
  faEye,
  faAngleRight,
  faAngleDown
);
dom.watch();

const container = document.getElementById('voomsway');

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
