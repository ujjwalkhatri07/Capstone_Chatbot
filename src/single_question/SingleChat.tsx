import React from "react";
import { Row, Col, Card, Typography, Space, Divider, Modal } from "antd";
import SingleSearchForm from "./SingleSearchForm";
import axios from "axios";

export default function SingleChat() {

  const [answers, setAnswers] = React.useState<any>([]);
  const [isOpen, setIsOpen] = React.useState<any>({ open: false, context: "" });

  const API_URL = "http://localhost:8000/question-answering";

  const search = (values: any) => {
    console.log(values);
    axios.post(API_URL, values).then(res => {
      if (res.status === 200) {
        const data = [{ question: values.question, context: values.context, message: res.data.message }];
        setAnswers([...data, ...answers])
      }
    }).catch(console.log)
  }

  console.log(answers)

  return (
    <>
      <Modal title="Context" open={isOpen.open} closable={true} footer={null} onCancel={() => setIsOpen({ ...isOpen, open: false, context: "" })}>
        <p>{isOpen.context}</p>
      </Modal>
      <Row gutter={[20, 20]}>
        <Typography.Text strong>Chatbot 🤖 (v 1.0)</Typography.Text>
        <Space size={"large"} />
        <Card title={<SingleSearchForm onFinish={search} />} bordered={true} style={{ width: "100%" }}>
          {
            answers.map(({ question, context, message }: any) => {
              return (
                <Col>
                  <div style={{ border: "1px solid #f4f4f4", padding: 5 }}>
                    <p><span style={{ marginRight: 10 }}>🧔🏻</span>{question}</p>
                    <Divider style={{ margin: 0, padding: 0 }} />
                    <p><span style={{ marginRight: 10 }}>🤖</span>{message}</p>
                    {/* <Row justify={"end"}><Button size="small" shape="circle" title="view Context" icon={<InfoOutlined />} onClick={() => {
                      setIsOpen({ ...isOpen, open: true, context });
                    }} /></Row> */}
                  </div>
                </Col>
              );
            })
          }
        </Card>
      </Row>
    </>
  );
}