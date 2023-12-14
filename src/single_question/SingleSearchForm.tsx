import { Button, Form, Input } from 'antd';

export default function SingleSearchForm({ onFinish }: { onFinish: any }) {

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item
        label="Question"
        name="question"
        rules={[{ required: true, message: 'This field is required!' }]}
      >
        <Input.TextArea placeholder="question" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Ask
        </Button>
      </Form.Item>
    </Form>
  );
}