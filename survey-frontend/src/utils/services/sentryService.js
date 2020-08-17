import {
  init,
  configureScope,
  withScope,
  captureException,
  showReportDialog,
} from '@sentry/browser';

class SentryService {
  constructor() {
    init({
      dsn: process.env.REACT_APP_SENTRY_KEY,
      attachStacktrace: true,
      debug: process.env.NODE_ENV !== 'production',
      environment: process.env.NODE_ENV,
    });
    this.setUserContext = this.setUserContext.bind(this);
    this.sendError = this.sendError.bind(this);
    this.showReportDialog = this.showReportDialog.bind(this);
  }

  setUserContext(context) {
    configureScope(scope => {
      scope.setUser(context);
    });
  }

  sendError(error, errorInfo = null) {
    if (errorInfo) {
      withScope(scope => {
        Object.keys(errorInfo).forEach(key => {
          scope.setExtra(key, errorInfo[key]);
        });
        captureException(error);
      });
    } else {
      captureException(error);
    }
  }

  showReportDialog() {
    showReportDialog();
  }
}

export default new SentryService();
