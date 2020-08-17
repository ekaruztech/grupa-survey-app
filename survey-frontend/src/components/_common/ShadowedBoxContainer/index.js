import React from 'react';
import './ShadowedBoxContainer.scss';
export default ({ children, className, ...rest }) => (
  <div className={`ShadowedBoxContainer ${className || ''}`.trim()} {...rest}>
    {children}
  </div>
);
