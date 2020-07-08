import React, { Component } from 'react';
var classNames = require('classnames');

class NavLogin extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="navbar__login ml-lg-3">
        <a className="navbar__login-link" href="/auth/login">
          Login{' '}
        </a>
      </div>
    );
  }
}

export default NavLogin;
