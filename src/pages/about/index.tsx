import { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Table } from 'antd';
import styles from './index.less';

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '代码',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: '持仓成本',
    dataIndex: 'cost',
    key: 'cost',
  },
];
export default function IndexPage() {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataSource, setDataSource] = useState<any[]>([]);
  useEffect(() => {
    const fundJson = localStorage.getItem('fund') || '[]';
    const fund = JSON.parse(fundJson);
    setDataSource(fund);
  }, []);
  function handleOk() {
    form
      .validateFields()
      .then((values) => {
        setDataSource([...dataSource, values]);
        const fund = [...dataSource, values];
        localStorage.setItem('fund', JSON.stringify(fund));
        form.resetFields();
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  }

  return (
    <div>
      <h1 className={styles.title}>基金持仓成本</h1>
      <Button onClick={() => setIsModalVisible(true)}>添加</Button>
      <Table dataSource={dataSource} columns={columns} />
      <Modal
        title="添加"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        okText="确定"
        cancelText="取消"
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="名称"
            name="name"
            rules={[{ required: true, message: '请输入名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="代码"
            name="code"
            rules={[{ required: true, message: '请输入代码' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="持仓成本"
            name="cost"
            rules={[{ required: true, message: '请输入持仓成本' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
