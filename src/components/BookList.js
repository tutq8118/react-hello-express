import React, { Component } from 'react';

class BookList extends Component {
  render() {
    return (
        <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
          <div className="card">
            <div className="card-body">
              <figure className="card-img mb-3">
                <img className="card-img-bottom" src={this.props.item.coverUrl} alt={this.props.item.title} />
                <h5 className="card-title">{this.props.item.title}</h5>
                <p className="card-text">{this.props.item.desc}</p>
                <div className="cart-button text-center">
                  <button className="btn btn-primary">Add to cart</button>
                </div>
              </figure>
            </div>
          </div>
        </div>
    );
  }
}

export default BookList;
