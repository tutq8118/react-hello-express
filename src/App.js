import React, { Component, useEffect } from 'react';
import 'bootstrap/scss/bootstrap.scss';
import 'antd/dist/antd.css';
import './App.scss';

import NavMenu from './components/NavMenu';
import SearchBox from './components/SearchBox';
import LoginForm from './components/LoginForm';
import MiniCart from './components/MiniCart';

import { Card, Row, Col, Alert, Typography } from 'antd';
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from "react-router-dom";


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
    console.log('contructor');
  }
  componentDidMount() {
    // var booksAPI = await axios.get(`${REACT_APP_API_SERVER}api/books`);
    axios.get(`${REACT_APP_API_SERVER}api/books`).then(booksAPI => {
      this.setState({
        books: booksAPI.data,
        allBooks: booksAPI.data,
      });  
    }).catch(error => console.log("fail to fetch data", error));
    console.log('component did mount');
    
  }

  handleSearch = () => {
    const q = this.inputElement.current.value;
    const { allBooks } = this.state;
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
    console.log('render');
    const { books } = this.state;
    return (
      <Router >
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
            <div className="container">
              <h1 className="h2">
                <NavLink className="navbar-brand" to="/" exact>HelloExpress</NavLink>
              </h1>
              <div className="collapse navbar-collapse justify-content-between">
                <ul className="navbar-nav flex-grow-1">
                  <li className="nav-item">
                      <NavLink className="nav-link" to="/books" exact>Books</NavLink>
                    </li>
                  </ul>
                <SearchBox>
                  <div className="form-group">
                    <input ref={this.inputElement} className="form-control" type="text" required name="q" placeholder="Type a book name..." onKeyPress={this.handleSearch} />
                  </div>
                  <button ref={this.buttonElement} className="btn btn-primary" onClick={this.handleSearch}>
                    Search
                  </button>
                </SearchBox>
                <div className="navbar__login ml-lg-3">
                  <NavLink className="navbar__login-link" to="/login" exact>Login</NavLink>
                </div>
                <MiniCart />
              </div>
            </div>
          </nav>
          <div className="container">
            <Route path="/" exact>
                <img className="d-block mx-auto mt-5 mw-100" src="https://hackernoon.com/hn-images/1*huCrw2ybIkyg6NzbhvrAeA.jpeg" />
            </Route>
            <Route path="/books" exact>
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
                </Row>
            </Route>
            <Route path="/login" exact>
                <LoginForm />
            </Route>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
