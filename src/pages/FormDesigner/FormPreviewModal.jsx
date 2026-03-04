import { Modal, Form, Button, message } from 'antd';
import FieldRenderer from './FieldRenderer';

export default function FormPreviewModal({ open, onClose, fields }) {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log('Form values:', values);
    message.success('表单提交成功（预览模式）');
    Modal.info({
      title: '提交数据',
      content: <pre style={{ maxHeight: 400, overflow: 'auto' }}>{JSON.stringify(values, null, 2)}</pre>,
    });
  };

  return (
    <Modal
      title="表单预览"
      open={open}
      onCancel={onClose}
      footer={null}
      width={640}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ marginTop: 16 }}
      >
        {fields.map((field) => (
          <Form.Item
            key={field.id}
            label={field.label}
            name={field.name}
            rules={field.required ? [{ required: true, message: `请填写${field.label}` }] : []}
          >
            <FieldRenderer field={field} />
          </Form.Item>
        ))}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            提交
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
