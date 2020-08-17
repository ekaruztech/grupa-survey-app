import React, { Component } from 'react';
import sentryService from '../../../utils/services/sentryService';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    sentryService.sendError(error, errorInfo);
  }

  render() {
    if (this.state.error) {
      //render fallback UI
      return (
        <div className="ErrorBoundary col-xl-4 col-lg-4 col-md-4 col-12 mx-auto mt-5">
          <h4>We're sorry — something's gone wrong.</h4>
          <p className="text-muted">
            Our team has been notified, for the meantime you can reload to go
            back to your previous page.
          </p>
          <p>
            Also you can{' '}
            <button
              className="btn btn-link px-0 my-0"
              onClick={() => sentryService.showReportDialog()}
            >
              click here
            </button>{' '}
            to fill out a report.
          </p>
        </div>
      );
    } else {
      //when there's not an error, render children untouched
      return this.props.children;
    }
  }
}
