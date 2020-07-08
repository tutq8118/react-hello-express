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
        {/* <form method="GET" action="/books/search">
          <div className="form-group">
            <input className="form-control" type="text" required name="q" placeholder="Type a book name..." />
          </div>
          <button className="btn btn-primary">Search</button>
        </form> */}
      </div>
    );
  }
}

export default SearchBox;
