import React from 'react';
import './style.scss';
export default ({ label, value, onChange, checked, name, disabled }) => {
  return (
    <span>
      <input
        disabled={disabled}
        className="styled-checkbox"
        id={`styled-checkbox${name}`}
        type="checkbox"
        value={value}
        checked={checked}
        onChange={e => onChange(e)}
      />
      <label htmlFor={`styled-checkbox${name}`}/>
    </span>
  );
};
