import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, message, Spin, Empty } from 'antd';
import { SendOutlined, ClockCircleOutlined, MessageOutlined } from '@ant-design/icons';
import './messageBoard.scss';

function formatTime(iso) {
  if (!iso) return '暂无';
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function LatestPosts({ refreshKey }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await axios.get('/api/postAll?limit=5');
        setData(res.data.data || []);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [refreshKey]);

  if (loading) {
    return <div className="sidebar-loading"><Spin /></div>;
  }

  if (data.length === 0) {
    return <Empty description="暂无文章" image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  return data.map((item, index) => (
    <div
      className="sidebar-item"
      onClick={() => navigate(`/posts/${item._id}`)}
      key={item._id || index}
    >
      <div className="sidebar-item-title">{item.title}</div>
      <div className="sidebar-item-time">
        <ClockCircleOutlined style={{ marginRight: 4 }} />
        {formatTime(item.createTime)}
      </div>
    </div>
  ));
}

function MessageBoard() {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSubmit = useCallback(async (values) => {
    setSubmitting(true);
    try {
      await axios.post('/api/postContent', {
        title: values.email,
        description: values.message,
        contents: values.message,
        createTime: new Date().toISOString(),
      });
      message.success('留言发布成功！');
      form.resetFields();
      setRefreshKey((k) => k + 1);
    } catch {
      message.error('发布失败，请稍后重试');
    } finally {
      setSubmitting(false);
    }
  }, [form]);

  return (
    <div className="message-board">
      <div className="message-board-left">
        <div className="form-card">
          <h2><MessageOutlined style={{ marginRight: 8 }} />发布留言</h2>
          <p className="form-desc">分享你的想法，留下你的足迹</p>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            requiredMark={false}
          >
            <Form.Item
              label="邮箱"
              name="email"
              rules={[
                { required: true, message: '请输入邮箱' },
                { type: 'email', message: '请输入有效的邮箱地址' },
              ]}
            >
              <Input placeholder="your@email.com" size="large" />
            </Form.Item>
            <Form.Item
              label="留言内容"
              name="message"
              rules={[{ required: true, message: '请输入留言内容' }]}
            >
              <Input.TextArea
                placeholder="写下你想说的..."
                rows={4}
                showCount
                maxLength={500}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SendOutlined />}
                loading={submitting}
                size="large"
                block
              >
                发布留言
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="message-board-right">
        <div className="sidebar-card">
          <h3>最新文章</h3>
          <LatestPosts refreshKey={refreshKey} />
        </div>
      </div>
    </div>
  );
}

export default MessageBoard;
