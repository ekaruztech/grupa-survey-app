import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

const SurveyCard = ({ name, responseCount, id }) => {
  return (
    <div className="center">
      <div className="text-container">
        <p className="text1">{name}</p>
        <p className="text2">{responseCount} Responses</p>
      </div>
      <div className="bottom-bar">
        <Link to={`/surveys/${id}`}>View</Link>
        <span>Edit</span>
        <span>Result</span>
      </div>
    </div>
  );
};

export default SurveyCard;
