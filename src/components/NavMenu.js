import React, { Component } from 'react';
var classNames = require('classnames');

class NavMenu extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {extraClass, items} = this.props;
    const navMenuClass = classNames('navbar-nav', extraClass);
    return (
      <ul className={navMenuClass}>
        <li className="nav-item">
          <a className="nav-link" href="/books">
            Books
          </a>
        </li>
      </ul>
    );
  }
}

export default NavMenu;
