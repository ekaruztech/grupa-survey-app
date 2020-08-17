import React from 'react';
import { ThemeColoredText } from '../../Styled/ThemeColoredText';
import './OfllineView.scss';

export default ({}) => (
  <div className="container">
    <div className="row">
      <div className="offline-view col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mx-auto text-center">
        <ThemeColoredText tag="h3">
          <i className="fas fa-exclamation-triangle" /> You seem to be offline
        </ThemeColoredText>
        <p>
          We can't complete your request at this time, please check your network
          connection.
        </p>
      </div>
    </div>
  </div>
);
