import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Spin } from 'antd';
import { ArrowLeftOutlined, ClockCircleOutlined } from '@ant-design/icons';
import './posts.scss';

function formatTime(iso) {
  if (!iso) return '暂无';
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function PostDetail() {
  const [obj, setObj] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`/api/getById?id=${id}`);
        setObj(res.data.data);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="posts-detail">
        <div className="loading-wrap"><Spin size="large" /></div>
      </div>
    );
  }

  if (!obj) {
    return (
      <div className="posts-detail">
        <div className="loading-wrap">文章不存在</div>
      </div>
    );
  }

  return (
    <div className="posts-detail">
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        className="back-btn"
      >
        返回
      </Button>
      <h1 className="detail-title">{obj.title}</h1>
      <div className="detail-meta">
        <ClockCircleOutlined style={{ marginRight: 4 }} />
        {formatTime(obj.createTime)}
      </div>
      {obj.description && (
        <div className="detail-desc">{obj.description}</div>
      )}
      <div className="detail-content">{obj.contents}</div>
    </div>
  );
}

export default PostDetail;
