import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import React, { useState, useEffect } from 'react';
import 'react-tabs/style/react-tabs.css';
import { Line } from 'react-chartjs-2';
import "./particularStock.css";
import { Button, Result, Form, Table, InputNumber, Tag, Space } from 'antd';
import { Link } from 'react-router-dom';


function LeftTabsExample() {
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


    // Table fourth
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <Link>{text}</Link>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (tags) => (
                <span>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link>Invite {record.name}</Link>
                    <Link>Delete</Link>
                </Space>
            ),
        },
    ];
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];
    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
            <Row>
                <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="first">Risk Calculation</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="second">Buying Stock</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="third">Stock Graph</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="fourth">Stock Information</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <div>
                                <Form onSubmit={handleSubmit}>
                                    <h2><b>Quantity</b></h2>
                                    <Form.Item>
                                        <InputNumber style={{ width: '50%' }}
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                        />
                                    </Form.Item>
                                    <Button type="primary" style={{ fontSize: '100%', backgroundColor: '#1f2fa5' }}>Submit</Button>
                                </Form>
                                {risk_cov && risk_cov && var_portfolio_cov && var_portfolio_cor && pnl && (
                                    <div>
                                        <p>Risk using Covariance: {risk_cov}</p>
                                        <p>Risk using Correlation: {risk_cor}</p>
                                        <p>Portfolio Variance using Covariance: {var_portfolio_cov}</p>
                                        <p>Portfolio Variance using Correlation: {var_portfolio_cor}</p>
                                        <p>Quantity: {quantity}</p>
                                        <p>PnL: {pnl}</p>
                                    </div>
                                )}
                            </div>
                            <div style={{marginTop: '10%'}}>
                                <p><b>Risk using Covariance :- {risk_cov}</b></p>
                                <p><b>Risk using Correlation :- {risk_cor}</b></p>
                                <p><b>Portfolio Variance using Covariance :- {var_portfolio_cov}</b></p>
                                <p><b>Portfolio Variance using Correlation :- {var_portfolio_cor}</b></p>
                                <p><b>Quantity :- {quantity}</b></p>
                                <p><b>PnL :- {pnl}</b></p>
                            </div>

                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            {/* Contents for Buying Stock tab */}
                            <Form onSubmit={handleSubmit2} style={{ justifyContent: 'center', alignItems: '' }}>
                                <h1 style={{ textAlign: 'center' }}><b>Buying Stock</b></h1>
                                <h2><b>Quantity</b></h2>
                                <Form.Item>
                                    <InputNumber style={{ width: '50%' }}
                                        type="number"
                                        value={quantity2}
                                        onChange={(e) => setQuantity2(e.target.value)}
                                    />
                                </Form.Item>

                                <Button type="primary" style={{ fontSize: '100%', backgroundColor: '#1f2fa5' }} disabled={loading}>Submit</Button>
                            </Form>
                            {successMessage && <p>{successMessage}</p> && (
                                <Result
                                    status="success"
                                    title="Successfully Calculated !"
                                    subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                                    extra={[
                                        <Button style={{ backgroundColor: '#1f2fa5' }} key="console">
                                            Done
                                        </Button>,
                                        <Button key="buy"> Calculate Again</Button>,
                                    ]}
                                />
                            )}
                            <Result
                                status="success"
                                title="Successfully Calculated !"
                                subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                                extra={[
                                    <Button style={{ backgroundColor: '#1f2fa5' }} >
                                        Done
                                    </Button>,
                                    <Button key="buy"> Calculate Again</Button>,
                                ]}
                            />
                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                            {/* Contents for Stock Information tab */}
                            {/* Render line chart */}
                            {Prices.length > 0 && (
                                <div className="chart-container">
                                    <Line data={chartData} />
                                </div>
                            )}
                        </Tab.Pane>
                        <Tab.Pane eventKey='fourth'>
                            {/* Render stock information */}
                            <div>
                                {Object.entries(stockinfo).map(([attribute, value]) => (
                                    <div key={attribute}>
                                        <strong>{attribute}: </strong> {value}
                                    </div>
                                ))}
                            </div>
                            <Table
                                columns={columns}
                                pagination={{
                                    position: ['bottomCenter'],
                                }}
                                dataSource={data}
                            />
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
}

export default LeftTabsExample;