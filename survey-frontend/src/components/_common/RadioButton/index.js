import React from 'react';
import './style.scss';
export default ({
  onChange,
  name,
  label,
  className,
  value,
  disabled,
  checked
}) => (
  <div className={`${className || ''} radio-custom`.trim()}>
    <input
      disabled={disabled}
      id={name}
      name={name}
      checked={checked}
      onChange={e => onChange(e)}
      value={value}
      type="radio"
    />
    <label htmlFor={name} className="radio-label">
      {label} {value}
    </label>
  </div>
);
