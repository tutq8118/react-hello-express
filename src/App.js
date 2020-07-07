import React, { Component } from 'react';

import 'bootstrap/scss/bootstrap.scss';
import './App.scss';

import BookList from './components/BookList';

const axios = require('axios').default;
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: []
    }
  }
  async componentDidMount() {
    var booksAPI = await axios
      .get('http://localhost:8000/api/books')
    this.setState({
      books: booksAPI.data
    });
  }
  render() {
    const {books} = this.state;
    return <div className="App">
      <div className="container">
        <h2 className="mb-3">List Books</h2>
        <div className="book-cards mb-5">
          <div className="row">
            {books.length > 0 && books.map((item, index) => {
              return <BookList key={index} item={item} />
            })}
        </div>
        </div>
      </div>
    </div>;
  }
}

export default App;
