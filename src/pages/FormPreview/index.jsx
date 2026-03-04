import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Typography, Spin, Empty, message, Card, Modal } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import FieldRenderer from '../FormDesigner/FieldRenderer';
import request from '../../utils/request';
import './formPreview.scss';

const { Title, Text } = Typography;

export default function FormPreview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    request
      .get(`/formById?id=${id}`)
      .then((res) => setFormData(res.data))
      .catch(() => message.error('加载表单失败'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = (values) => {
    Modal.info({
      title: '提交数据',
      width: 560,
      content: (
        <pre style={{ maxHeight: 400, overflow: 'auto', fontSize: 13 }}>
          {JSON.stringify(values, null, 2)}
        </pre>
      ),
    });
  };

  if (loading) {
    return (
      <div className="form-preview-page">
        <div className="loading-wrap"><Spin size="large" /></div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="form-preview-page">
        <Empty description="表单不存在" />
        <Button onClick={() => navigate('/forms')} style={{ marginTop: 16 }}>
          返回列表
        </Button>
      </div>
    );
  }

  const fields = formData.schema || [];

  return (
    <div className="form-preview-page">
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate('/forms')}
        className="back-btn"
      >
        返回列表
      </Button>
      <Card className="preview-card">
        <Title level={4}>{formData.name}</Title>
        {formData.description && (
          <Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>
            {formData.description}
          </Text>
        )}
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {fields.map((field) => (
            <Form.Item
              key={field.id}
              label={field.label}
              name={field.name}
              rules={
                field.required
                  ? [{ required: true, message: `请填写${field.label}` }]
                  : []
              }
            >
              <FieldRenderer field={field} />
            </Form.Item>
          ))}
          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
