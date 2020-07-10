import React, { Component } from 'react';
import 'bootstrap/scss/bootstrap.scss';
import 'antd/dist/antd.css';
import './App.scss';

import NavMenu from './components/NavMenu';
import SearchBox from './components/SearchBox';
import NavLogin from './components/NavLogin';
import MiniCart from './components/MiniCart';

import { Card, Row, Col, Alert, Typography } from 'antd';

const { Meta } = Card;
const { Title } = Typography;

const axios = require('axios').default;
const REACT_APP_API_SERVER = process.env.REACT_APP_API_SERVER;
class App extends Component {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();
    this.buttonElement = React.createRef();

    this.state = {
      books: [],
    };
  }
  async componentDidMount() {
    var booksAPI = await axios.get(`${REACT_APP_API_SERVER}api/books`);
    this.setState({
      books: booksAPI.data,
      allBooks: booksAPI.data,
    });
  }

  handleSearch = () => {
    const q = this.inputElement.current.value;
    const { books, allBooks } = this.state;
    if (!allBooks) {
      return;
    }
    const filteredBooks = allBooks.filter((item) => {
      return item.title.toLowerCase().includes(q.toLowerCase()) === true;
    });
    this.setState({
      books: filteredBooks,
    });
  };

  render() {
    const { books } = this.state;
    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
          <div className="container">
            <h1 className="h2">
              <a className="navbar-brand" href="#">
                HelloExpress
              </a>
            </h1>
            <div className="collapse navbar-collapse justify-content-between">
              <NavMenu extraClass="flex-grow-1" />
              <SearchBox>
                <div className="form-group">
                  <input ref={this.inputElement} className="form-control" type="text" required name="q" placeholder="Type a book name..." onChange={this.handleSearch} onKeyUp={this.handleSearch} />
                </div>
                {/* <button ref={this.buttonElement} className="btn btn-primary">
                  Search
                </button> */}
              </SearchBox>
              <NavLogin />
              <MiniCart />
            </div>
          </div>
        </nav>

        {/* <div className="container">
          <h2 className="mb-3">List Books - Bootstrap 4</h2>
          <div className="book-cards mb-5">
            <div className="row">
              {books.length > 0 &&
                books.map((item, index) => {
                  return <BookList key={index} item={item} />;
                })}
            </div>
          </div>
        </div> */}

        <div className="container">
          <Title level={2}>List Books - Ant Design</Title>
          <Row gutter={30}>
            {books.length > 0 &&
              books.map((item, index) => {
                return (
                  <Col key={index} span={24} sm={12} md={6}>
                    <Card hoverable cover={<img alt={item.title} src={item.coverUrl} />}>
                      <Meta title={item.title} description={item.desc} />
                      <button type="button" className="ant-btn mt-2 ant-btn-primary ant-btn-round">
                        <span>Add to cart</span>
                      </button>
                    </Card>
                  </Col>
                );
              })}
            {books.length === 0 && (
              <div className="col-12">
                <div className="alert alert-info text-center">No item found</div>
              </div>
            )}
          </Row>
        </div>
      </div>
    );
  }
}

export default App;
