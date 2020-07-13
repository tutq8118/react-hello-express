import React, { Component } from 'react';

function Pagination (props) {
  const {totalPage} = props;
  return (
    <div className="d-flex justify-content-center">
      <ul className="pagination text-center">
        <li className="page-item"><a className="page-link" href="/books?page=1">1</a></li>
        <li className="page-item"><a className="page-link" href="/books?page=2">2</a></li>
        <li className="page-item"><a className="page-link" href="/books?page=3">3</a></li>
      </ul>
    </div>
  );
}

export default Pagination;
