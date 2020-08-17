import React from 'react';
import classNames from 'classnames';
import './Progress.scss';

const GlobalProgress = ({ className, message, md, sm, ...rest }) => (
  <div
    className={classNames('global-loader-container', {
      ['md']: md,
      ['sm']: sm,
    })}
    {...rest}
  >
    <div className="global-loader" />
  </div>
);

export default GlobalProgress;
