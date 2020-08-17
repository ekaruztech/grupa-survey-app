import styled from 'styled-components';
import React from 'react';
export const ThemeColoredText = props => {
  const { tag, children, ...rest } = props;
  const Component = styled(tag || 'p')`
    color: ${props => props.theme['color-primary'] || 'originalColor'};
    margin-bottom: ${props => (!tag || (tag && tag === 'p') ? 0 : undefined)};
    &:hover {
      color: ${props => props.theme['color-primary'] || 'originalColor'};
    }
  `;
  return <Component {...rest}>{children}</Component>;
};
export default ThemeColoredText;
