import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/scss/bootstrap.scss';
import 'antd/dist/antd.css';
import './App.scss';

import NavMenu from './components/NavMenu';
import SearchBox from './components/SearchBox';
import LoginForm from './components/LoginForm';
import MiniCart from './components/MiniCart';

import { Card, Row, Col, Alert, Typography } from 'antd';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const { Meta } = Card;
const { Title } = Typography;

const axios = require('axios').default;
const REACT_APP_API_SERVER = process.env.REACT_APP_API_SERVER;
function App(props) {
  const inputSearchRef = useRef(null);
  const buttonElement = useRef(null);
  const formSearchRef = useRef(null);

  const [books, setBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  useEffect(() => {
    axios
      .get(`${REACT_APP_API_SERVER}api/books`)
      .then((booksAPI) => {
        setBooks(booksAPI.data);
        setAllBooks(booksAPI.data);
      })
      .catch((error) => console.log('fail to fetch data', error));
    console.log('component did mount');
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = inputSearchRef.current.value;
    if (!allBooks) {
      return;
    }
    const filteredBooks = allBooks.filter((item) => {
      return item.title.toLowerCase().includes(q.toLowerCase()) === true;
    });
    setBooks(filteredBooks);
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
          <div className="container">
            <h1 className="h2">
              <NavLink className="navbar-brand" to="/" exact>
                HelloExpress
              </NavLink>
            </h1>
            <div className="collapse navbar-collapse justify-content-between">
              <ul className="navbar-nav flex-grow-1">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/books" exact>
                    Books
                  </NavLink>
                </li>
              </ul>
              <SearchBox>
                <form ref={formSearchRef} onSubmit={handleSearch}>
                  <div className="form-group">
                    <input ref={inputSearchRef} className="form-control" type="text" required name="q" placeholder="Type a book name..." />
                  </div>
                  <button className="btn btn-primary">Search</button>
                </form>
              </SearchBox>
              <div className="navbar__login ml-lg-3">
                <NavLink className="navbar__login-link" to="/login" exact>
                  Login
                </NavLink>
              </div>
              <div className="navbar__cart ml-lg-3">
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                  <DropdownToggle caret tag="div" className="navbar__login-link">
                    <span>Cart</span>
                    <span>0</span>
                  </DropdownToggle>
                  <DropdownMenu right className="dropdown-cart">
                    <p>Your cart is empty</p>
                  </DropdownMenu>
                </Dropdown>
              </div>
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
                        <button type="button" className="ant-btn mt-2 ant-btn-primary ant-btn-round" data-id={item._id}>
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

export default App;
