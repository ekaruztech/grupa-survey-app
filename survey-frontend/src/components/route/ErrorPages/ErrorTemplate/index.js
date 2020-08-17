import React from 'react';
import './ErrorTemplate.scss';

const ErrorTemplate = ({ headerText, subHeaderText, message, children }) => {
  return (
    <div className="error-template d-flex justify-content-center">
      <div className="error-template-inner">
        {headerText && <h1>{headerText}</h1>}
        {subHeaderText && <h4 className="text-muted">{subHeaderText}</h4>}
        {message && <div className="error-details">{message}</div>}
        <div className="error-actions">{children}</div>
      </div>
    </div>
  );
};

export default ErrorTemplate;
