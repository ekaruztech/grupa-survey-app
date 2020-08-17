import React from 'react';
import './Error.scss';

export default ({ message }) => (
  <div className="error-page col-9 px-3 mx-auto">
    <h1 className="text-muted">Ooops!</h1>
    <h6 className="text-muted">There's a problem!</h6>
    {message && <p className="text-custom">{message}</p>}
  </div>
);
