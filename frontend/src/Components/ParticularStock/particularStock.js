import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Line } from 'react-chartjs-2';
import "./particularStock.css";
// import {CategoryScale} from 'chart.js'; 
// import { Chart as ChartJS } from "chart.js/auto";



// import { Layout, Menu, Breadcrumb, theme } from "antd";
// const {Header , Content , Footer , Sider} = Layout;

// Line.register(CategoryScale);
const Main = () => {
  const [quantity, setQuantity] = useState('');
  const [risk, setRisk] = useState('');
  const [pnl, setPnl] = useState('');
  const [closingPrices, setClosingPrices] = useState([]);
  const [chartData, setChartData] = useState({});
  const [quantity2, setQuantity2] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

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
  }, []);

  const fetchClosingPrices = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/getClosingPrices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stk_id: 2 }), // default stk_id as 2
      });
      const data = await response.json();
      setClosingPrices(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    // Prepare data for chart
    const labels = closingPrices.map((price, index) => price.Date);// Assuming each price corresponds to one label
    const data = closingPrices.map(price => parseFloat(price['Close/Last'])); // Extract closing prices and convert to numbers
    console.log(data)
    console.log(labels)
    setChartData({
      labels: labels,
      datasets: [
        {
          label: 'Closing Prices',
          data: data,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
    });
  }, [closingPrices]);

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
      setRisk(data.risk);
      setPnl(data.pnl);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Tabs>
      <TabList>
        <Tab>Risk Calculation</Tab>
        <Tab>Buying Stock</Tab>
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
          {risk && pnl && (
            <div>
              <p>Risk: {risk}</p>
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
        <h2>Stock Information</h2>
        {/* Render line chart */}
        {closingPrices.length > 0 && (
          <div className="chart-container">
            <Line data={chartData} />
          </div>
        )}
      </TabPanel>
    </Tabs>
  );
};

export default Main;
