import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Statistic, Typography, Spin } from 'antd';
import {
  FileTextOutlined,
  UserOutlined,
  FormOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import request from '../../utils/request';
import './dashboard.scss';

const { Title } = Typography;

export default function Dashboard() {
  const [stats, setStats] = useState({ posts: 0, users: 0, forms: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [postRes, userRes, formRes] = await Promise.all([
          request.get('/postAll').catch(() => ({ data: [], pagination: { total: 0 } })),
          request.get('/userAll').catch(() => ({ data: [] })),
          request.get('/formAll').catch(() => ({ data: [] })),
        ]);
        setStats({
          posts: postRes.pagination?.total ?? postRes.data?.length ?? 0,
          users: userRes.data?.length ?? 0,
          forms: formRes.data?.length ?? 0,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { title: '文章数量', value: stats.posts, icon: <FileTextOutlined />, color: '#667eea', path: '/posts' },
    { title: '用户数量', value: stats.users, icon: <UserOutlined />, color: '#f5576c', path: '/users' },
    { title: '表单数量', value: stats.forms, icon: <FormOutlined />, color: '#4facfe', path: '/forms' },
    { title: '留言板', value: '查看', icon: <MessageOutlined />, color: '#43e97b', path: '/message-board' },
  ];

  return (
    <div className="dashboard-page">
      <Title level={4}>仪表盘</Title>
      <Spin spinning={loading}>
        <Row gutter={[20, 20]}>
          {cards.map((c) => (
            <Col xs={24} sm={12} lg={6} key={c.title}>
              <Card
                hoverable
                className="stat-card"
                onClick={() => navigate(c.path)}
              >
                <div className="stat-icon" style={{ background: c.color }}>
                  {c.icon}
                </div>
                <Statistic
                  title={c.title}
                  value={c.value}
                  valueStyle={{ fontWeight: 700, fontSize: 28 }}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Spin>
    </div>
  );
}
