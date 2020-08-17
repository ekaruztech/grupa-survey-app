import React from 'react';
import './style.scss';
const Switch = ({ checked, onChange, style, className, ...rest }) => (
  <div
    className={`switch-container ${className || ''}`.trim()}
    style={{ ...style }}
  >
    {/* eslint-disable jsx-a11y/label-has-for */}
    <label>
      <input
        checked={checked}
        onChange={e => onChange(e)}
        className="switch"
        type="checkbox"
        {...rest}
      />
      <div>
        <div />
      </div>
    </label>
    {/* eslint-enable jsx-a11y/label-has-for */}
  </div>
);

export default Switch;
