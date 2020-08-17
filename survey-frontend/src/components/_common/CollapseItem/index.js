import React from 'react';
import uuid from 'uuid/v4';
import classNames from 'classnames';
import './CollapseItem.scss';
import { ThemeColoredText } from '../Styled/ThemeColoredText';

const CollapseItem = ({ title, children, id = uuid(), isOpen }) => (
  <div className="collapse-wrapper">
    <ThemeColoredText
      tag="button"
      color="link"
      className="btn collapse-control p-0"
      data-toggle="collapse"
      data-target={`#${id}`}
      aria-expanded="false"
      aria-controls={id}
    >
      {title}
    </ThemeColoredText>
    <div className={classNames('collapse', { show: isOpen })} id={id}>
      <div className="card card-body px-0">{children}</div>
    </div>
  </div>
);
export default CollapseItem;
