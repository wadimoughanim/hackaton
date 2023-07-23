import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './App.css';

import orderBookABI from './OrderBook.json';

const web3 = new Web3(Web3.givenProvider);
const orderBookContractAddress = 'YOUR_CONTRACT_ADDRESS';
const orderBookContract = new web3.eth.Contract(orderBookABI, orderBookContractAddress);

function App() {
  const [account, setAccount] = useState(null);
  const [bids, setBids] = useState([]);
  const [asks, setAsks] = useState([]);

  useEffect(() => {
    const loadBlockchainData = async () => {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    };
    loadBlockchainData();
  }, []);

  const createLimitOrder = async (fixedRate, amount, isBid) => {
    await orderBookContract.methods.createLimitOrder(fixedRate, amount, isBid).send({ from: account });
    fetchOrders();
  };

  const marketOrder = async (amount, isBid) => {
    await orderBookContract.methods.marketOrder(amount, isBid).send({ from: account });
    fetchOrders();
  };

  const fetchOrders = async () => {
    const bidOrders = await orderBookContract.methods.BidOrders().call();
    const askOrders = await orderBookContract.methods.AskOrders().call();
    setBids(bidOrders);
    setAsks(askOrders);
  };

  return (
    <div className="App">
      <h1>Order Book</h1>
      <button onClick={fetchOrders}>Refresh orders</button>
      <h3>Create limit order</h3>
      <button onClick={() => createLimitOrder(100, 10, true)}>Create bid limit order (fixedRate: 100, amount: 10)</button>
      <button onClick={() => createLimitOrder(200, 10, false)}>Create ask limit order (fixedRate: 200, amount: 10)</button>
      <h3>Create market order</h3>
      <button onClick={() => marketOrder(10, true)}>Create bid market order (amount: 10)</button>
      <button onClick={() => marketOrder(10, false)}>Create ask market order (amount: 10)</button>
      <h2>Bid Orders</h2>
      {bids.length > 0 ? (
        <ul>
          {bids.map((bid, index) => (
            <li key={index}>{`Rate: ${bid.rate}, Amount: ${bid.amount}`}</li>
          ))}
        </ul>
      ) : (
        <p>No bids</p>
      )}
      <h2>Ask Orders</h2>
      {asks.length > 0 ? (
        <ul>
          {asks.map((ask, index) => (
            <li key={index}>{`Rate: ${ask.rate}, Amount: ${ask.amount}`}</li>
          ))}
        </ul>
      ) : (
        <p>No asks</p>
      )}
    </div>
  );
}

export default App;
