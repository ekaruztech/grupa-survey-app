import React from 'react';
import styled, { keyframes } from 'styled-components';

const bounced = keyframes`
      0%, 80%, 100% {
        transform: scale(0);
    }
    40% {
        transform: scale(1.0);
  }
`;
const Progress = styled.div`
  margin: 0 auto;
  width: 70px;
  text-align: center;
  position: relative;
  .progress-spinner-message {
    color: #666;
    font-size: 14px;
    margin-top: 3px;
    margin-bottom: 0;
  }
  > div {
    margin: 0 3px;
    width: 15px;
    height: 15px;
    background-color: ${props => props.theme['color-primary']};
    border-radius: 100%;
    display: inline-block;
    animation: ${bounced} 1.4s infinite ease-in-out both;
    &.bounce1 {
      -webkit-animation-delay: -0.32s;
      animation-delay: -0.32s;
    }

    &.bounce2 {
      -webkit-animation-delay: -0.16s;
      animation-delay: -0.16s;
    }
  }

  &.alt {
    div {
      background-color: #ffffff;
    }
    .progress-spinner-message {
      color: #ffffff;
    }
  }
  &.dark {
    div {
      background-color: #333333;
    }
    .progress-spinner-message {
      color: #333333;
    }
  }
`;

export default ({ message, ...rest }) => (
  <Progress {...rest}>
    <div className="bounce1" />
    <div className="bounce2" />
    <div className="bounce3" />
    {message && <p className="progress-spinner-message">{message}</p>}
  </Progress>
);
