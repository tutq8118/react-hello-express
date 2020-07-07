import React, { Component } from 'react';
import 'bootstrap/scss/bootstrap.scss';
import 'antd/dist/antd.css';
import './App.scss';

import BookList from './components/BookList';

import { Card, Row, Col, Button, Typography } from 'antd';
const { Meta } = Card;
const { Title } = Typography;

const axios = require('axios').default;
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
    };
  }
  async componentDidMount() {
    var booksAPI = await axios.get('http://localhost:8000/api/books');
    this.setState({
      books: booksAPI.data,
    });
  }
  render() {
    const { books } = this.state;
    return (
      <div className="App">
        <div className="container">
          <h2 className="mb-3">List Books - Bootstrap 4</h2>
          <div className="book-cards mb-5">
            <div className="row">
              {books.length > 0 &&
                books.map((item, index) => {
                  return <BookList key={index} item={item} />;
                })}
            </div>
          </div>
        </div>
        <div className="container">
          <Title level={2}>List Books - Ant Design</Title>
          <Row gutter={30}>
            {books.length > 0 &&
              books.map((item, index) => {
                return (
                  <Col key={index} span={6}>
                    <Card hoverable cover={<img alt={item.title} src={item.coverUrl} />}>
                      <Meta title={item.title} description={item.desc} />
                      <Button type="primary" shape="round" className="mt-2">
                        Add to cart
                      </Button>
                    </Card>
                  </Col>
                );
              })}
          </Row>
        </div>
      </div>
    );
  }
}

export default App;
