import React, { Component } from 'react';
var classNames = require('classnames');

class MiniCart extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="navbar__cart ml-lg-3">
        <div className="dropdown">
          <a className="dropdown-toggle" href="#" data-toggle="dropdown" role="button" aria-expanded="false">
            <span>Cart</span> <span>0</span> <span className="caret" />
          </a>
          <ul className="dropdown-menu dropdown-cart" role="menu">
            <li>Your cart is empty</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default MiniCart;
