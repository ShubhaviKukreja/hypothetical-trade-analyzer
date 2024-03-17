import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Line } from 'react-chartjs-2';
import "./particularStock.css";
import {CategoryScale} from 'chart.js'; 
import { Chart as ChartJS } from "chart.js/auto";

// Line.register(CategoryScale);
const Main = () => {
  const [quantity, setQuantity] = useState('');
  const [risk_cov, setRiskCov] = useState('');
  const [risk_cor, setRiskCor] = useState('');
  const [var_portfolio_cov, setVarCov] = useState('');
  const [var_portfolio_cor, setVarCor] = useState('');
  const [pnl, setPnl] = useState('');
  const [Prices, setPrices] = useState([]);
  const [chartData, setChartData] = useState({});
  const [quantity2, setQuantity2] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [stockinfo, setStockInfo] = useState({});

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/buyStock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ qty: quantity2, stk_id: 2 }), // Default stk_id as 2
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message);
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch closing prices from backend
    fetchClosingPrices();
    fetchStkData();
  }, []);

  const fetchClosingPrices = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/getPrices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stk_id: 2 }), // default stk_id as 2
      });
      const data = await response.json();
      setPrices(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const fetchStkData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/getStockInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stk_id: 2 }), // default stk_id as 2
      });
      const data = await response.json();
      setStockInfo(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    // Prepare data for chart
    const labels = Prices.map((price, index) => price.Date);// Assuming each price corresponds to one label
    const close_data = Prices.map(price => parseFloat(price['Close'])); // Extract closing prices and convert to numbers
    const open_data = Prices.map(price => parseFloat(price['Open'])); // Extract closing prices and convert to numbers
    const high_data = Prices.map(price => parseFloat(price['High'])); // Extract closing prices and convert to numbers
    const low_data = Prices.map(price => parseFloat(price['Low'])); // Extract closing prices and convert to numbers

    setChartData({
      labels: labels,
      datasets: [
        {
          label: 'Closing Prices',
          data: close_data,
          fill: false,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.1
        },
        {
          label: 'Opening Prices',
          data: open_data,
          fill: false,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          tension: 0.1
        },
        {
          label: 'High',
          data: high_data,
          fill: false,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          tension: 0.1
        },
        {
          label: 'Low',
          data: low_data,
          fill: false,
          borderColor: 'rgba(255, 206, 86, 1)',
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          tension: 0.1
        },
      ]
    });
  }, [Prices]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/getRiskandPNL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity, stk_id: 2 }), // static stock_id as 1
      });
      const data = await response.json();
      setVarCov(data.portfolio_var_covariance);
      setVarCor(data.portfolio_var_correlation);
      setRiskCov(data.risk_covariance);
      setRiskCor(data.risk_correlation);
      setPnl(data.pnl);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Tabs className='tabs'>
      <TabList>
        <Tab>Risk Calculation</Tab>
        <Tab>Buying Stock</Tab>
        <Tab>Stock Graph</Tab>
        <Tab>Stock Information</Tab>
      </TabList>

      <TabPanel>
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Quantity:
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </label>
            <button type="submit">Submit</button>
          </form>
          {risk_cov && risk_cov && var_portfolio_cov && var_portfolio_cor && pnl && (
            <div>
              <p>Risk using Covariance: {risk_cov}</p>
              <p>Risk using Correlation: {risk_cor}</p>
              <p>Portfolio Variance using Covariance: {var_portfolio_cov}</p>
              <p>Portfolio Variance using Correlation: {var_portfolio_cor}</p>
              <p>PnL: {pnl}</p>
            </div>
          )}
        </div>
      </TabPanel>
      
      <TabPanel>
        {/* Contents for Buying Stock tab */}
        <h2>Buying Stock</h2>
        <form onSubmit={handleSubmit2}>
          <label>
            Quantity:
            <input
              type="number"
              value={quantity2}
              onChange={(e) => setQuantity2(e.target.value)}
            />
          </label>
          <button type="submit" disabled={loading}>Submit</button>
        </form>
        {successMessage && <p>{successMessage}</p>}
      </TabPanel>

      
      <TabPanel>
        {/* Contents for Stock Information tab */}
        {/* Render line chart */}
        {Prices.length > 0 && (
          <div className="chart-container">
            <Line data={chartData} />
          </div>
        )}
      </TabPanel>
      <TabPanel>
      {/* Render stock information */}
      <div>
        {Object.entries(stockinfo).map(([attribute, value]) => (
          <div key={attribute}>
            <strong>{attribute}: </strong> {value}
          </div>
        ))}
      </div>
    </TabPanel>
    </Tabs>
  );
};

export default Main;
