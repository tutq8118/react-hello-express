import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/scss/bootstrap.scss';
import 'antd/dist/antd.css';
import './App.scss';

import SearchBox from './components/SearchBox';
import LoginForm from './components/LoginForm';
import Pagination from './components/Pagination';

import { Card, Row, Col, Alert, Typography } from 'antd';
import { BrowserRouter as Router, Route, NavLink, useHistory, useLocation } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const queryString = require('query-string');

const { Meta } = Card;
const { Title } = Typography;

const defaultCoverUrl = 'https://res.cloudinary.com/tutq8118/image/upload/v1592319239/placeholder-book-cover-default_rkyvcu.png';

const axios = require('axios').default;
const REACT_APP_API_SERVER = process.env.REACT_APP_API_SERVER;

function App(props) {
  const inputSearchRef = useRef(null);
  const buttonElement = useRef(null);
  const formSearchRef = useRef(null);

  const [books, setBooks] = useState([]);
  const [newestBooks, setNewestBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filter, setFilter] = useState({
    page: 1,
    limit: 8,
    q: ""
  });
  const [staticInfo, setStaticInfo] = useState({
    totalPage: 1,
    fillteredTotalPage: 1,
    fillteredAmount: 0,
    totalAmount: 0
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const paramString = queryString.stringify(filter);

  useEffect(() => {
    axios
      .get(`${REACT_APP_API_SERVER}api/index`)
      .then((booksAPI) => {
        setNewestBooks(booksAPI.data.books);
      })
      .catch((error) => console.log('fail to fetch data', error));
  }, []);
  
  useEffect(() => {
    axios
      .get(`${REACT_APP_API_SERVER}api/books?${paramString}`)
      .then((booksAPI) => {
        setBooks(booksAPI.data.books);
        setFilteredBooks(booksAPI.data.filteredBooks);
        setStaticInfo({
          totalPage: booksAPI.data.totalPage,
          fillteredTotalPage: booksAPI.data.fillteredTotalPage,
          fillteredAmount: booksAPI.data.fillteredAmount,
          totalAmount: booksAPI.data.totalAmount
        })
      })
      .catch((error) => console.log('fail to fetch data', error));
  }, [filter]);

  const handlePageChange = (e) => {
    e.preventDefault(e);
    const index = e.target.getAttribute("data-index");
    setFilter({
      ...filter,
      page: index
    })
  } 

  function FormSearch() {
    let history = useHistory();
    function handleSearch(e) {
      e.preventDefault();
      history.push('/search');
      const q = inputSearchRef.current.value;
      setFilter({
        q: q,
      });
      
    }

    return (
      <form ref={formSearchRef} onSubmit={handleSearch}>
        <div className="form-group">
          <input ref={inputSearchRef} className="form-control" type="text" required name="q" placeholder="Type a book name..." />
        </div>
        <button className="btn btn-primary" type="submit">Search</button>
      </form>
    );
  }

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
                <FormSearch />
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
            <Title level={2}>Newest Books</Title>
            <Row gutter={30} className="book-cards">
              {newestBooks.length > 0 &&
                newestBooks.map((item, index) => {
                  return (
                    <Col key={index} span={24} sm={12} md={6} className="book-cards__item mb-4">
                      <Card hoverable className="" cover={<img alt={item.title} src={item.coverUrl ? item.coverUrl : defaultCoverUrl} />}>
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

          <Route path="/books" exact>
              <Title level={2}>{`All ${staticInfo.totalAmount} books`}</Title>
            <Row gutter={30} className="book-cards">
              {books.length > 0 &&
                books.map((item, index) => {
                  return (
                    <Col key={index} span={24} sm={12} md={6} className="book-cards__item mb-4">
                      <Card hoverable className="" cover={<img alt={item.title} src={item.coverUrl ? item.coverUrl : defaultCoverUrl} />}>
                        <Meta title={item.title} description={item.desc} />
                        <button type="button" className="ant-btn mt-2 ant-btn-primary ant-btn-round" data-id={item._id}>
                          <span>Add to cart</span>
                        </button>
                      </Card>
                    </Col>
                  );
                })}
            </Row>
            {staticInfo.totalPage > 1 && <Pagination action={handlePageChange} totalPage={staticInfo.totalPage} />}
          </Route>

          <Route path="/search" exact>
              <Title level={2}>{`${staticInfo.fillteredAmount} books found with "${filter.q}"`}</Title>
            <Row gutter={30} className="book-cards">
              {filteredBooks.length > 0 &&
                filteredBooks.map((item, index) => {
                  return (
                    <Col key={index} span={24} sm={12} md={6} className="book-cards__item mb-4">
                      <Card hoverable className="" cover={<img alt={item.title} src={item.coverUrl ? item.coverUrl : defaultCoverUrl} />}>
                        <Meta title={item.title} description={item.desc} />
                        <button type="button" className="ant-btn mt-2 ant-btn-primary ant-btn-round" data-id={item._id}>
                          <span>Add to cart</span>
                        </button>
                      </Card>
                    </Col>
                  );
                })}
            </Row>
            {staticInfo.fillteredTotalPage > 1 && <Pagination action={handlePageChange} totalPage={ staticInfo.fillteredTotalPage } />}
          </Route>

          <Route path="/login" exact>
            <LoginForm />
          </Route>
        </div>
        <footer className="footer mt-auto py-3">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">Lorem ipsum dolor 2020.</div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
