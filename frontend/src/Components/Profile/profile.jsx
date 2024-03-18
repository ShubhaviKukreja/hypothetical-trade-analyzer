import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [userStockList, setstocks] = useState([]);
  const [userTxnList, settxn] = useState([]);
  const [userPnlList, setpnl] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/getUserlist/')
      .then(res => {
        setstocks(res.data);
        console.log(res.data)
      });
      axios.get('http://127.0.0.1:8000/getTransactionHis/')
      .then(res => {
        settxn(res.data);
        console.log(res.data)
      });
      axios.get('http://127.0.0.1:8000/getCurrentPNL/')
      .then(res => {
        setpnl(res.data);
        console.log(res.data)
      });

  }, []);

  return (
    <>
    stock list 
    transaction history
    profit loss
    </>
  );
};

export default Profile;
