import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Typography, Button, Empty, Spin, message, Popconfirm, Space, Tag } from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ReloadOutlined,
  CalendarOutlined,
  UserOutlined,
} from '@ant-design/icons';
import request from '../../utils/request';
import './formList.scss';

const { Title, Text, Paragraph } = Typography;

export default function FormList() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchForms = async () => {
    setLoading(true);
    try {
      const res = await request.get('/formAll');
      setForms(res.data || []);
    } catch {
      message.error('获取表单列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const handleDelete = async (id) => {
    try {
      await request.delete(`/formDelete?id=${id}`);
      message.success('删除成功');
      fetchForms();
    } catch (err) {
      message.error(err.error || '删除失败');
    }
  };

  return (
    <div className="form-list-page">
      <div className="page-header">
        <Title level={4}>表单列表</Title>
        <Space>
          <Button icon={<ReloadOutlined />} onClick={fetchForms}>
            刷新
          </Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/form-designer')}>
            新建表单
          </Button>
        </Space>
      </div>

      <Spin spinning={loading}>
        {forms.length === 0 && !loading ? (
          <Empty
            description="暂无表单"
            style={{ padding: '80px 0' }}
          >
            <Button type="primary" onClick={() => navigate('/form-designer')}>
              创建第一个表单
            </Button>
          </Empty>
        ) : (
          <Row gutter={[20, 20]}>
            {forms.map((form) => (
              <Col xs={24} sm={12} lg={8} xl={6} key={form._id}>
                <Card
                  hoverable
                  className="form-card"
                  cover={
                    form.previewImage ? (
                      <div className="card-cover">
                        <img src={form.previewImage} alt={form.name} />
                      </div>
                    ) : (
                      <div className="card-cover card-cover-empty">
                        <FormPlaceholder count={(form.schema || []).length} />
                      </div>
                    )
                  }
                  actions={[
                    <Button
                      type="text"
                      size="small"
                      icon={<EyeOutlined />}
                      onClick={() => navigate(`/form-preview/${form._id}`)}
                    >
                      预览
                    </Button>,
                    <Button
                      type="text"
                      size="small"
                      icon={<EditOutlined />}
                      onClick={() => navigate(`/form-designer/${form._id}`)}
                    >
                      编辑
                    </Button>,
                    <Popconfirm
                      title="确定删除该表单？"
                      onConfirm={() => handleDelete(form._id)}
                      okText="确定"
                      cancelText="取消"
                    >
                      <Button type="text" size="small" danger icon={<DeleteOutlined />}>
                        删除
                      </Button>
                    </Popconfirm>,
                  ]}
                >
                  <Card.Meta
                    title={form.name}
                    description={
                      <div className="card-meta">
                        <Paragraph ellipsis={{ rows: 2 }} className="card-desc">
                          {form.description || '暂无描述'}
                        </Paragraph>
                        <div className="card-info">
                          <Tag icon={<CalendarOutlined />} color="default">
                            {new Date(form.createdAt).toLocaleDateString('zh-CN')}
                          </Tag>
                          {form.createdBy && (
                            <Tag icon={<UserOutlined />} color="default">
                              {form.createdBy}
                            </Tag>
                          )}
                          <Tag color="blue">{(form.schema || []).length} 个字段</Tag>
                        </div>
                      </div>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Spin>
    </div>
  );
}

function FormPlaceholder({ count }) {
  return (
    <div className="form-placeholder">
      {Array.from({ length: Math.min(count || 3, 5) }, (_, i) => (
        <div key={i} className="placeholder-line">
          <div className="placeholder-label" style={{ width: `${40 + (i * 10) % 30}%` }} />
          <div className="placeholder-input" />
        </div>
      ))}
    </div>
  );
}
