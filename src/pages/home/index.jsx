import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Spin, Empty, Tag } from 'antd';
import { ClockCircleOutlined, ReadOutlined } from '@ant-design/icons';
import './home.scss';

function formatTime(iso) {
  if (!iso) return '暂无';
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get('/api/postAll');
        setData(res.data.data || []);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="home">
      <div className="home-header">
        <h1><ReadOutlined style={{ marginRight: 8 }} />文章列表</h1>
        <p>浏览所有已发布的文章</p>
      </div>
      <div className="posts-list">
        {loading ? (
          <div className="loading-wrap">
            <Spin size="large" tip="加载中..." />
          </div>
        ) : data.length === 0 ? (
          <Empty description="暂无文章" style={{ padding: '80px 0' }} />
        ) : (
          data.map((item, index) => (
            <div
              className="posts-item"
              onClick={() => navigate(`/posts/${item._id}`)}
              key={item._id || index}
            >
              <div className="posts-index">{index + 1}</div>
              <div className="posts-body">
                <div className="posts-title">
                  <span className="title">{item.title}</span>
                  <Tag icon={<ClockCircleOutlined />} color="default">
                    {formatTime(item.createTime)}
                  </Tag>
                </div>
                <div className="posts-desc">{item.description || '暂无描述'}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
