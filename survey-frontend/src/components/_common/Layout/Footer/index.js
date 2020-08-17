import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import './Footer.scss';
import { addProtocol } from '../../../../utils/functions';
import ThemeColoredText from '../../Styled/ThemeColoredText';

const Footer = ({ settings }) => {
  const orgName =
    get(settings, 'account.basic_information.organization_name') || null;
  const orgWebsiteUrl =
    get(settings, 'account.basic_information.website') || '#';
  return (
    <footer className="footer">
      <span>
        <ThemeColoredText tag="a" href={addProtocol(orgWebsiteUrl)}>
          {orgName}
        </ThemeColoredText>{' '}
        &copy; 2019
      </span>
      <span>
        Powered by{' '}
        <a className="text-muted" href="https://voomsway.com">
          <strong>Voomsway Innovations</strong>
        </a>
      </span>
    </footer>
  );
};
const mapStateToProps = state => ({
  settings: state.app.settings,
});
export default connect(mapStateToProps)(Footer);
