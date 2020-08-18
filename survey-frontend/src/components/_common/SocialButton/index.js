import React, { Component } from 'react';
import SocialLogin from 'react-social-login';
import './SocialButton.scss';

class SocialButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { provider, triggerLogin, ...rest } = this.props;
    return (
      <div
        key={provider}
        className="social-button"
        onClick={() => triggerLogin()}
        {...rest}
      >
        {this.props.children}
      </div>
    );
  }
}

export default SocialLogin(SocialButton);
