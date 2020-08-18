import React from 'react';
import './index.scss';

const Card = () => {
  return (
    <div className="center">
      <div className="text-container">
        <p className="text1">New Website Feedback Survey</p>
        <p className="text2">20 Responses</p>
      </div>
      <div className="bottom-bar">
        <span>View</span>
        <span>Edit</span>
        <span>Result</span>
      </div>
    </div>
  );
};

export default Card;
