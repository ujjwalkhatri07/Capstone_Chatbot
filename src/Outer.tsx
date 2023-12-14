import { Col, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import SingleChat from './single_question/SingleChat';
import Chat from './Chat';

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: (<p>New <small>(v 1.0)</small></p>),
    children: (<SingleChat />),
  },
  {
    key: '2',
    label: (<p>Old <small>(v0.1)</small></p>),
    children: (<Chat />),
  }
];

export default function Outer() {
  return (
    <Col sm={{ span: 24 }} md={{ span: 12, offset: 6 }} lg={{ span: 12, offset: 6 }} style={{ marginTop: 50 }} >
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </Col>
  );
}
