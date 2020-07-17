import React, { Component } from 'react';
var classNames = require('classnames');

class SearchBox extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="search-form">
        {this.props.children}
      </div>
    );
  }
}

export default SearchBox;
