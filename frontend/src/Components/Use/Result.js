import { Button, Result, Form, Table, InputNumber, Tag, Space } from 'antd';


const ResultBuying = () => {
    return (
        <>
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
        </>
    )
}

export default ResultBuying;