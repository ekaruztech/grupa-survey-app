import React, { Component } from 'react';
import SocialLogin from 'react-social-login';
import { Button } from 'antd';
import './SocialButton.scss';

class SocialButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { provider, triggerLogin, loading, ...rest } = this.props;
    return (
      <div
        key={provider}
        className="social-button"
        onClick={() => triggerLogin()}
      >
        <Button
          {...rest}
          block
          loading={loading}
          className={'login-btn social-btn'}
        >
          {!loading ? this.props.children : null}
        </Button>
      </div>
    );
  }
}

export default SocialLogin(SocialButton);
