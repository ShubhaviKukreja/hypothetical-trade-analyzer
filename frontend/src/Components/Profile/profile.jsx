import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import React, { useState, useEffect } from 'react';
import 'react-tabs/style/react-tabs.css';
import "chart.js/auto";
import axios from 'axios';
import { Button, Result, Form, Table, InputNumber, Tag, Space } from 'antd';
import { Link } from 'react-router-dom';


function Profile() {

    // backend
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

    // Default input table 
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
        <div>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Stock List</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Transaction History</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third">Profit & Loss</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey='first'>

                                <Table
                                    columns={columns}
                                    pagination={{
                                        position: ['bottomCenter'],
                                    }}
                                    dataSource={data}
                                />
                            </Tab.Pane>
                            <Tab.Pane eventKey='second'>

                                <Table
                                    columns={columns}
                                    pagination={{
                                        position: ['bottomCenter'],
                                    }}
                                    dataSource={data}
                                />
                            </Tab.Pane>
                            <Tab.Pane eventKey='third'>

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
        </div>

    );
}

export default Profile;