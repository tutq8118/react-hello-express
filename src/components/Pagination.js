import React from 'react';

function Pagination (props) {
  const {totalPage, action} = props;
  const items = [];
  for (let number = 1; number <= totalPage; number++) {
  items.push(<li key={number}  className="page-item"><a onClick={action} className="page-link" data-index={number}>{number}</a></li>)
  }
  return (
    <div className="d-flex justify-content-center">
      <ul className="pagination text-center">
         {items}
      </ul>
    </div>
  );
}

export default Pagination;
