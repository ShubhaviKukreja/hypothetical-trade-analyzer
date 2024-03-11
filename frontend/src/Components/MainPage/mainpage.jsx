import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockList = () => {
  const [stocks, setstocks] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/getstocklist/')
      .then(res => {
        setstocks(res.data);
        console.log(res.data)
      });
  }, []);

  return (
    <ul>
      {stocks.map(stock => (
        <li key={stock.stk_id}>
          {stock.stk_name}
          {/* Add buttons for edit and delete operations here */}
        </li>
      ))}
    </ul>
  );
};

export default StockList;
