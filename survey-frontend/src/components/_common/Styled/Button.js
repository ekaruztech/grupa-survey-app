import styled from 'styled-components';
import React from 'react';

const paddingMap = {
  sm: '5px 12px',
  md: '11px 30px',
  lg: '14px 50px',
};

const fontSizeMap = {
  sm: '11px',
  md: '12px',
  lg: '14px',
};

const bgColors = {
  grey: '#a2a2a2',
  gray: '#a2a2a2',
  lightgrey: '#eaeaea',
  lightgray: '#eaeaea',
  white: '#ffffff',
  link: 'transparent',
};

const colors = {
  grey: '#ffffff',
  gray: '#ffffff',
  lightgrey: '#333',
  lightgray: '#333',
  primary: '#ffffff',
};

const setBackground = props => {
  const bgColorMap = {
    ...bgColors,
    primary: props.theme['color-primary'],
  };
  if (props.color && bgColorMap[props.color]) {
    return bgColorMap[props.color];
  }
  return '#a2a2a2';
};
// white, primary, outline
const setBackgroundOnHover = props => {
  const bgColorMap = {
    ...bgColors,
    primary: props.theme['color-primary'],
  };
  if (props.outline) {
    return props.noHover ? bgColorMap.white : props.theme['color-primary'];
  }
  if (props.color && bgColorMap[props.color]) {
    if (['grey', 'gray', 'lightgrey', 'lightgray'].includes(props.color)) {
      return props.theme['color-primary'];
    } else {
      return bgColorMap[props.color];
    }
  }
  return '#1c96d6';
};

const setColorOnHover = props => {
  const bgColorMap = {
    ...bgColors,
    primary: props.theme['color-primary'],
  };
  if (
    (props.outline && !props.noHover) ||
    (props.color && props.color === 'primary')
  ) {
    return '#eff2f6';
  }
  if (props.color && bgColorMap[props.color]) {
    if (['grey', 'gray', 'lightgrey', 'lightgray'].includes(props.color)) {
      return '#ffffff';
    }
  }
  return props.theme['color-primary'];
};

const setColor = props => {
  const colorMap = {
    ...colors,
    white: props.theme['color-primary'],
    link: props.theme['color-primary'],
  };
  if (props.color && colorMap[props.color]) {
    return colorMap[props.color];
  }
  return '#ffffff';
};

const setBorder = props => {
  if (props.color && !props.outline) {
    if (props.color === 'white') {
      return 'solid 2px #eff2f6';
    }
    if (props.color === 'link') {
      return 'solid 1px transparent';
    }
  }
  if (props.outline) {
    return `solid 1px ${props.theme['color-primary']}`;
  }
  /*  if (['grey', 'gray','lightgrey', 'lightgray'].includes(props.color)) {
    return `solid 1px ${bgColors[props.color] || props.theme['color-primary']}`;
  }
  return `solid 1px ${props.theme['color-primary']}`;*/
  return `solid 1px transparent`;
};

export const Button = props => {
  const { tag, children, ...rest } = props;
  const Component = styled(tag || 'button')`
    /* Adapt the colors based on primary prop */
    position: relative;
    background-color: ${setBackground};
    color: ${setColor};
    font-weight: bold;
    border: ${setBorder};
    cursor: pointer;
    opacity: 1;
    border-radius: ${props => (props.rounded ? '22px' : 0)};
    font-size: ${props =>
      props.size && fontSizeMap[props.size]
        ? fontSizeMap[props.size]
        : undefined};
    padding: ${props =>
      props.size && paddingMap[props.size]
        ? paddingMap[props.size]
        : '5px 10px'};
    width: ${props => (props.block ? '100%' : undefined)};
    &:hover {
      opacity: 0.9;
      color: ${setColorOnHover};
      border: ${setBorder};
      background-color: ${setBackgroundOnHover};
    }
    &.active {
      cursor: default;
      color: ${props =>
        props.outline ? props.theme['color-primary'] : '#fff'};
      background-color: ${props =>
        props.outline ? '#fff' : props.theme['color-primary']};
      border: 1px solid transparent;
    }
    &:disabled {
      opacity: 0.7;
    }
    &:focus {
      outline: 0;
      box-shadow: none;
    }
  `;
  return <Component {...rest}>{children}</Component>;
};
export default Button;
