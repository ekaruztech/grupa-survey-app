import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../_common/Styled/Button';
import usePageTitle from '../../../utils/react-hooks/usePageTitle';
import ErrorTemplate from './ErrorTemplate';

export default () => {
  usePageTitle('Page Not Found');
  return (
    <ErrorTemplate
      headerText="Oops!"
      subHeaderText="404, Not found"
      message="Sorry, an error has occurred, Requested page not found!"
    >
      <p className="mt-4">
        <Button tag={Link} size="md" color="primary" className="mb-4" to="/">
          Book Trip
        </Button>
        &nbsp; &nbsp;
        <Button
          tag={Link}
          size="md"
          color="lightgrey"
          className="mb-4"
          to="/charters/new"
        >
          Charter a Vehicle
        </Button>
      </p>
    </ErrorTemplate>
  );
};
